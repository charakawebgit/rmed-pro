/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { calculators as mainCalculators, getDefaultInputs, getDefaultInputUnits } from './calculators.js';
import { calculators as additionalCalculators } from './calculators2.js';
import { medicalAbbreviations } from './abbreviations.js';
import { medicalTerms } from './medical_terminology.js';
import { normalLabValues } from './lab_values.js';
import { medicalMnemonics } from './mnemonics.js';
import { nutritionGuidelines } from './nutrition_guidelines.js';
import { medicalProcedures } from './procedures.js'; // Import procedures

const calculators = [...mainCalculators, ...additionalCalculators];

const App = () => {
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem('currentView') || 'calculators';
  });
  const [selectedCalculatorId, setSelectedCalculatorId] = useState(() => {
    return localStorage.getItem('selectedCalculatorId') || null;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValues, setInputValues] = useState(() => {
    const saved = localStorage.getItem('calculatorInputValues');
    return saved ? JSON.parse(saved) : {};
  });
  const [calculatorInputUnits, setCalculatorInputUnits] = useState(() => {
    const saved = localStorage.getItem('calculatorInputUnits');
    return saved ? JSON.parse(saved) : {};
  });

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [deferredInstallPrompt, setDeferredInstallPrompt] = useState(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    localStorage.setItem('currentView', currentView);
  }, [currentView]);

  const selectedCalculator = useMemo(() => {
    return calculators.find(calc => calc.id === selectedCalculatorId) || null;
  }, [selectedCalculatorId]);

  useEffect(() => {
    if (selectedCalculatorId) {
      localStorage.setItem('selectedCalculatorId', selectedCalculatorId);
    } else {
      localStorage.removeItem('selectedCalculatorId');
    }
  }, [selectedCalculatorId]);

  useEffect(() => {
    localStorage.setItem('calculatorInputValues', JSON.stringify(inputValues));
  }, [inputValues]);

  useEffect(() => {
    localStorage.setItem('calculatorInputUnits', JSON.stringify(calculatorInputUnits));
  }, [calculatorInputUnits]);

  useEffect(() => {
    if (currentView === 'calculators' && selectedCalculator) {
      const calcId = selectedCalculator.id;
      const currentCalcInputs = inputValues[calcId];
      const currentCalcUnits = calculatorInputUnits[calcId];

      const needsInputInit = selectedCalculator.inputs && selectedCalculator.inputs.length > 0 &&
                           (!currentCalcInputs || Object.keys(currentCalcInputs).length === 0);

      if (needsInputInit) {
        setInputValues(prev => ({
          ...prev,
          [calcId]: getDefaultInputs(selectedCalculator),
        }));
      }

      const hasUnitsToInitialize = selectedCalculator.inputs && selectedCalculator.inputs.some(input => input.defaultUnit || input.supportedUnits);
      const needsUnitInit = hasUnitsToInitialize &&
                            (!currentCalcUnits || Object.keys(currentCalcUnits).length === 0);

      if (needsUnitInit) {
        setCalculatorInputUnits(prev => ({
          ...prev,
          [calcId]: getDefaultInputUnits(selectedCalculator),
        }));
      }
    }
  }, [currentView, selectedCalculator, inputValues, calculatorInputUnits]);


  const handleInputChange = useCallback((calculatorId, inputId, value) => {
    setInputValues(prev => ({
      ...prev,
      [calculatorId]: {
        ...(prev[calculatorId] || getDefaultInputs(calculators.find(c => c.id === calculatorId))),
        [inputId]: value,
      },
    }));
  }, []);

  const handleUnitChange = useCallback((calculatorId, inputId, unit) => {
    setCalculatorInputUnits(prev => ({
      ...prev,
      [calculatorId]: {
        ...(prev[calculatorId] || getDefaultInputUnits(calculators.find(c => c.id === calculatorId))),
        [inputId]: unit,
      },
    }));
  }, []);

  const handleClearInputs = useCallback((calculatorId) => {
    const calculatorToClear = calculators.find(calc => calc.id === calculatorId);
    if (calculatorToClear) {
      setInputValues(prev => ({
        ...prev,
        [calculatorId]: getDefaultInputs(calculatorToClear),
      }));
      setCalculatorInputUnits(prev => ({
        ...prev,
        [calculatorId]: getDefaultInputUnits(calculatorToClear),
      }));
    }
  }, []);

  const currentInputs = selectedCalculator ? inputValues[selectedCalculator.id] || getDefaultInputs(selectedCalculator) : {};
  const currentUnits = selectedCalculator ? calculatorInputUnits[selectedCalculator.id] || getDefaultInputUnits(selectedCalculator) : {};

  const result = useMemo(() => {
    if (currentView !== 'calculators' || !selectedCalculator) return null;
    if (selectedCalculator.inputs.length > 0) {
      const allInputsProvided = selectedCalculator.inputs.every(inputDef => {
        if (selectedCalculator.id === 'montrealIBD') {
          const ibdType = currentInputs['ibdType'] || selectedCalculator.inputs.find(i => i.id === 'ibdType')?.defaultUnit;
          const isCrohnsSelected = ibdType === 'crohns';
          const isUcSelected = ibdType === 'uc';
          const crohnsSpecificInputs = ['crohnsAge', 'crohnsLocation', 'crohnsBehavior', 'crohnsPerianal'];
          const ucSpecificInputs = ['ucExtent'];
          if (crohnsSpecificInputs.includes(inputDef.id) && !isCrohnsSelected) return true;
          if (ucSpecificInputs.includes(inputDef.id) && !isUcSelected) return true;
        }
        // For macronutrient calculator, ensure custom percentages sum to 100 if custom is chosen
        if (selectedCalculator.id === 'macroRatio' && currentInputs['ratioProfile'] === 'custom') {
          if (inputDef.id.startsWith('custom')) { // Only check custom fields for emptiness if custom profile is selected
            const { customCarbPct, customProteinPct, customFatPct } = currentInputs;
            if (customCarbPct === undefined || String(customCarbPct).trim() === '' ||
                customProteinPct === undefined || String(customProteinPct).trim() === '' ||
                customFatPct === undefined || String(customFatPct).trim() === '') {
              return false; // Don't calculate if custom fields are empty
            }
          }
        }
        const value = currentInputs[inputDef.id];
        return value !== undefined && String(value).trim() !== '';
      });
      if (!allInputsProvided && selectedCalculator.id !== 'macroRatio') return null;
      if (!allInputsProvided && selectedCalculator.id === 'macroRatio' && currentInputs['ratioProfile'] !== 'custom') return null;
    }
    try {
      return selectedCalculator.calculate(currentInputs, currentUnits);
    } catch (error) {
      console.error("Calculation error:", error);
      return "Error during calculation";
    }
  }, [currentView, selectedCalculator, currentInputs, currentUnits]);

  const interpretedResultText = useMemo(() => {
    if (currentView !== 'calculators' || !selectedCalculator || !selectedCalculator.interpretResult || result === null || String(result).trim() === '') return null;
    if (typeof result === 'string' && (result.toLowerCase().includes("error") || result.toLowerCase().includes("please fill") || result.toLowerCase().includes("must sum to 100") || result.toLowerCase().includes("cannot be greater") || result.toLowerCase().includes("should be >") || result.toLowerCase().includes("must be positive"))) {
      return null;
    }
    return selectedCalculator.interpretResult(result, currentInputs, currentUnits);
  }, [currentView, selectedCalculator, result, currentInputs, currentUnits]);

  const filteredCalculators = useMemo(() => {
    if (currentView !== 'calculators') return [];
    return calculators.filter(calc =>
      calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (calc.keywords && calc.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase())))
    ).sort((a, b) => a.name.localeCompare(b.name));
  }, [currentView, searchTerm]);

  useEffect(() => {
    const beforeInstallPromptHandler = (e) => {
      e.preventDefault();
      setDeferredInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);

    const appInstalledHandler = () => {
      setDeferredInstallPrompt(null);
      console.log('PWA was installed');
    };
    window.addEventListener('appinstalled', appInstalledHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);
      window.removeEventListener('appinstalled', appInstalledHandler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredInstallPrompt) {
      return;
    }
    deferredInstallPrompt.prompt();
    const { outcome } = await deferredInstallPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    // We can only use the prompt once, clearing it regardless of outcome.
    setDeferredInstallPrompt(null);
  };

  return (
    React.createElement(React.Fragment, null,
      React.createElement("header", { className: "app-header" },
        React.createElement("div", { className: "app-title-area" },
          React.createElement("h1", null, "rMed Medical Tool"),
          React.createElement(ViewSwitcher, { currentView, setCurrentView })
        ),
        React.createElement("div", { className: "header-actions-area" },
          deferredInstallPrompt && React.createElement(PWAInstallButton, { onInstallClick: handleInstallClick }),
          React.createElement(DarkModeToggle, { theme, toggleTheme })
        )
      ),
      React.createElement("div", { className: "app-container" },
        currentView === 'calculators' && (
          React.createElement(React.Fragment, null,
            React.createElement(CalculatorListPanel, {
              calculators: filteredCalculators,
              selectedCalculatorId: selectedCalculatorId,
              onSelectCalculator: setSelectedCalculatorId,
              searchTerm: searchTerm,
              onSearchChange: setSearchTerm,
            }),
            React.createElement(CalculatorInterfacePanel, {
              selectedCalculator: selectedCalculator,
              inputValues: currentInputs,
              onInputChange: handleInputChange,
              result: result,
              interpretedResultText: interpretedResultText,
              currentUnits: currentUnits,
              onUnitChange: handleUnitChange,
              onClearInputs: handleClearInputs,
            })
          )
        ),
        currentView === 'abbreviations' && (
          React.createElement(AbbreviationLookupPanel, { abbreviations: medicalAbbreviations })
        ),
        currentView === 'terminology' && (
          React.createElement(MedicalTerminologyPanel, { terms: medicalTerms })
        ),
        currentView === 'labValues' && (
          React.createElement(LabValuesPanel, { labValues: normalLabValues })
        ),
        currentView === 'mnemonics' && (
          React.createElement(MnemonicsPanel, { mnemonics: medicalMnemonics })
        ),
        currentView === 'nutritionGuide' && (
          React.createElement(NutritionGuidePanel, { guidelines: nutritionGuidelines })
        ),
        currentView === 'procedures' && (
          React.createElement(ProceduresPanel, { procedures: medicalProcedures })
        )
      ),
      React.createElement("footer", { className: "app-footer" },
        React.createElement("p", null, "Disclaimer: This tool is for educational and informational purposes only and does not constitute medical advice. Consult with a qualified healthcare professional for medical decisions. Reference ranges for lab values are approximate and can vary by laboratory. Nutritional information is general and not a substitute for personalized dietitian advice. Procedure information is for general understanding and not a guide for performing procedures."),
        React.createElement("p", null, "\xA9 ", new Date().getFullYear(), " rMed - redefining healthcare. Website: ", React.createElement("a", { href: "https://rmed.in", target: "_blank", rel: "noopener noreferrer" }, "rmed.in"))
      )
    )
  );
};

const PWAInstallButton = ({ onInstallClick }) => {
  return (
    React.createElement("button", {
      onClick: onInstallClick,
      className: "install-app-button",
      title: "Install rMed App",
      "aria-label": "Install rMed Medical Tools App",
    }, "📥 Install App")
  );
};

const DarkModeToggle = ({ theme, toggleTheme }) => {
  return (
    React.createElement("button", {
      onClick: toggleTheme,
      className: "dark-mode-toggle-button",
      title: `Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`,
      "aria-label": `Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`,
    },
      theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'
    )
  );
};

const ViewSwitcher = ({ currentView, setCurrentView }) => {
  return React.createElement("div", { className: "view-switcher", role: "tablist", "aria-label": "Main views" },
    React.createElement("button", {
      className: `view-switch-button ${currentView === 'calculators' ? 'active' : ''}`,
      onClick: () => setCurrentView('calculators'),
      role: "tab",
      "aria-selected": currentView === 'calculators',
      "aria-controls": "calculator-view",
    }, "Calculators"),
    React.createElement("button", {
      className: `view-switch-button ${currentView === 'abbreviations' ? 'active' : ''}`,
      onClick: () => setCurrentView('abbreviations'),
      role: "tab",
      "aria-selected": currentView === 'abbreviations',
      "aria-controls": "abbreviations-view",
    }, "Abbreviations"),
    React.createElement("button", {
      className: `view-switch-button ${currentView === 'terminology' ? 'active' : ''}`,
      onClick: () => setCurrentView('terminology'),
      role: "tab",
      "aria-selected": currentView === 'terminology',
      "aria-controls": "terminology-view",
    }, "Terminology"),
    React.createElement("button", {
      className: `view-switch-button ${currentView === 'labValues' ? 'active' : ''}`,
      onClick: () => setCurrentView('labValues'),
      role: "tab",
      "aria-selected": currentView === 'labValues',
      "aria-controls": "lab-values-view",
    }, "Lab Values"),
    React.createElement("button", {
      className: `view-switch-button ${currentView === 'mnemonics' ? 'active' : ''}`,
      onClick: () => setCurrentView('mnemonics'),
      role: "tab",
      "aria-selected": currentView === 'mnemonics',
      "aria-controls": "mnemonics-view",
    }, "Mnemonics"),
    React.createElement("button", {
      className: `view-switch-button ${currentView === 'nutritionGuide' ? 'active' : ''}`,
      onClick: () => setCurrentView('nutritionGuide'),
      role: "tab",
      "aria-selected": currentView === 'nutritionGuide',
      "aria-controls": "nutrition-guide-view",
    }, "Nutrition Guide"),
    React.createElement("button", {
      className: `view-switch-button ${currentView === 'procedures' ? 'active' : ''}`,
      onClick: () => setCurrentView('procedures'),
      role: "tab",
      "aria-selected": currentView === 'procedures',
      "aria-controls": "procedures-view",
    }, "Procedures")
  );
};
const AbbreviationLookupPanel = ({ abbreviations }) => {
  const [searchTermAbbr, setSearchTermAbbr] = useState('');

  const filteredAbbreviations = useMemo(() => {
    if (!abbreviations || !Array.isArray(abbreviations)) return [];

    const trimmedSearch = searchTermAbbr.trim();
    if (!trimmedSearch) {
      return abbreviations.sort((a, b) => a.primaryAbbr.localeCompare(b.primaryAbbr));
    }

    const lowercasedFilter = trimmedSearch.toLowerCase();

    return abbreviations.filter(item => {
      const hasPrimaryAbbr = item.primaryAbbr?.toLowerCase().includes(lowercasedFilter);
      const hasFullForm = item.fullForm?.toLowerCase().includes(lowercasedFilter);
      const hasDescription = item.description?.toLowerCase().includes(lowercasedFilter);
      const hasCategory = item.category?.toLowerCase().includes(lowercasedFilter);
      const hasNotes = item.notes?.toLowerCase().includes(lowercasedFilter);
      const hasVariant = item.variants?.some(v => v.toLowerCase().includes(lowercasedFilter));

      return hasPrimaryAbbr || hasFullForm || hasDescription || hasCategory || hasNotes || hasVariant;
    }).sort((a, b) => a.primaryAbbr.localeCompare(b.primaryAbbr));
  }, [abbreviations, searchTermAbbr]);

  return (
    React.createElement("main", { id: "abbreviations-view", className: "abbreviation-lookup-panel calculator-interface-panel", role: "tabpanel", "aria-labelledby": "tab-abbreviations" },
      React.createElement("h3", null, "Medical Abbreviation Lookup"),
      React.createElement("div", { className: "search-bar-container" },
        React.createElement("input", {
          type: "search",
          "aria-label": "Search medical abbreviations",
          placeholder: "Search abbreviations (e.g., CHF, NPO)...",
          className: "calculator-search-input",
          value: searchTermAbbr,
          onChange: (e) => setSearchTermAbbr(e.target.value),
        })
      ),
      React.createElement("ul", { className: "abbreviation-list" },
        filteredAbbreviations.length > 0 ? (
          filteredAbbreviations.map(item => (
            React.createElement("li", { key: item.id, className: "abbreviation-item" },
              React.createElement("div", { className: "abbreviation-header" },
                React.createElement("strong", { className: "abbreviation-abbr" }, item.primaryAbbr),
                item.category && React.createElement("span", { className: "abbreviation-category-tag" }, item.category)
              ),
              React.createElement("span", { className: "abbreviation-fullform" }, item.fullForm),
              React.createElement("p", { className: "abbreviation-desc" }, item.description),
              item.notes && React.createElement("p", { className: "abbreviation-notes" }, React.createElement("strong", null, "Note: "), item.notes),
              React.createElement("div", { className: "abbreviation-footer" },
                (item.variants && item.variants.length > 0) && React.createElement("div", { className: "abbreviation-variants" },
                  React.createElement("strong", null, "Also: "),
                  item.variants.join(', ')
                ),
                (item.snomedCtId || item.icd10Code) && React.createElement("div", { className: "abbreviation-codes" },
                  [
                    item.snomedCtId && `SNOMED CT: ${item.snomedCtId}`,
                    item.icd10Code && `ICD-10: ${item.icd10Code}`
                  ].filter(Boolean).join(' | ')
                )
              )
            )
          ))
        ) : (
          React.createElement("li", { className: "no-results-text" }, "No abbreviations match your search.")
        )
      )
    )
  );
};

const MedicalTerminologyPanel = ({ terms }) => {
  const { useState, useMemo } = React;
  const [searchTermTerm, setSearchTermTerm] = useState('');

  const filteredTerms = useMemo(() => {
    if (!terms || !Array.isArray(terms)) return [];
    const searchTerm = searchTermTerm.toLowerCase().trim();
    if (!searchTerm) {
      return terms.sort((a, b) => a.primaryTerm.localeCompare(b.primaryTerm));
    }
    return terms.filter(item =>
      (item.primaryTerm && item.primaryTerm.toLowerCase().includes(searchTerm)) ||
      (item.definition && item.definition.toLowerCase().includes(searchTerm)) ||
      (item.primaryAbbr && item.primaryAbbr.toLowerCase().includes(searchTerm)) ||
      (item.variants && item.variants.some(v => v.toLowerCase().includes(searchTerm))) ||
      (item.category && item.category.toLowerCase().includes(searchTerm)) ||
      (item.example && item.example.toLowerCase().includes(searchTerm)) ||
      (item.etymology && item.etymology.toLowerCase().includes(searchTerm)) ||
      (item.notes && item.notes.toLowerCase().includes(searchTerm))
    ).sort((a, b) => a.primaryTerm.localeCompare(b.primaryTerm));
  }, [terms, searchTermTerm]);

  return (
    React.createElement("main", { id: "terminology-view", className: "medical-terminology-panel calculator-interface-panel", role: "tabpanel", "aria-labelledby": "tab-terminology" },
      React.createElement("h3", null, "Medical Terminology Lookup"),
      React.createElement("div", { className: "search-bar-container" },
        React.createElement("input", {
          type: "search",
          "aria-label": "Search medical terminology",
          placeholder: "Search terms (e.g., Myalgia, -itis)...",
          className: "calculator-search-input",
          value: searchTermTerm,
          onChange: (e) => setSearchTermTerm(e.target.value),
        })
      ),
      React.createElement("ul", { className: "terminology-list" },
        filteredTerms.length > 0 ? (
          filteredTerms.map(item => (
            React.createElement("li", { key: item.id, className: "terminology-item" },
              React.createElement("div", { className: "terminology-header" },
                React.createElement("strong", { className: "terminology-term" }, item.primaryTerm),
                item.category && React.createElement("span", { className: "terminology-category-tag" }, item.category)
              ),
              React.createElement("p", { className: "terminology-definition" }, item.definition),
              (item.etymology || item.example || item.notes) && React.createElement("div", { className: "terminology-details" },
                item.etymology && React.createElement("p", { className: "terminology-detail-item" }, React.createElement("strong", null, "Etymology: "), item.etymology),
                item.example && React.createElement("p", { className: "terminology-detail-item" }, React.createElement("strong", null, "Example: "), React.createElement("em", null, item.example)),
                item.notes && React.createElement("p", { className: "terminology-detail-item" }, React.createElement("strong", null, "Notes: "), item.notes)
              ),
              React.createElement("div", { className: "terminology-footer" },
                (item.variants && item.variants.length > 0) && React.createElement("div", { className: "terminology-variants" },
                  React.createElement("strong", null, "Also: "),
                  item.variants.join(', ')
                ),
                (item.snomedCtId || item.icd10Code) && React.createElement("div", { className: "terminology-codes" },
                  [
                    item.snomedCtId && `SNOMED CT: ${item.snomedCtId}`,
                    item.icd10Code && `ICD-10: ${item.icd10Code}`
                  ].filter(Boolean).join(' | ')
                )
              )
            )
          ))
        ) : (
          React.createElement("li", { className: "no-results-text" }, "No terms match your search.")
        )
      )
    )
  );
};

const LabValuesPanel = ({ labValues }) => {
  const [searchTermLab, setSearchTermLab] = useState('');

  // No changes needed in this filtering logic
  const filteredLabValues = useMemo(() => {
    if (!labValues || !Array.isArray(labValues)) return [];
    if (!searchTermLab.trim()) {
      return labValues;
    }
    const lowerSearchTerm = searchTermLab.toLowerCase();
    return labValues.filter(item =>
      item.testName.toLowerCase().includes(lowerSearchTerm) ||
      (item.shortName && item.shortName.toLowerCase().includes(lowerSearchTerm)) ||
      item.category.toLowerCase().includes(lowerSearchTerm) ||
      (item.description && item.description.toLowerCase().includes(lowerSearchTerm))
    ).sort((a, b) => a.testName.localeCompare(b.testName));
  }, [labValues, searchTermLab]);

  return (
    React.createElement("main", { id: "lab-values-view", className: "lab-values-panel calculator-interface-panel", role: "tabpanel", "aria-labelledby": "tab-lab-values" },
      React.createElement("h3", null, "Normal Lab Values Reference"),
      React.createElement("div", { className: "search-bar-container" },
        React.createElement("input", {
          type: "search",
          "aria-label": "Search lab values",
          placeholder: "Search lab values (e.g., Sodium, Hb, Renal)...",
          className: "calculator-search-input",
          value: searchTermLab,
          onChange: (e) => setSearchTermLab(e.target.value),
        })
      ),
      React.createElement("p", { className: "lab-values-disclaimer" }, "Disclaimer: Reference ranges are approximate and can vary by laboratory and patient population. This tool is for informational purposes only and not a substitute for clinical judgment or official lab reports."),
      React.createElement("ul", { className: "lab-values-list" },
        filteredLabValues.length > 0 ? (
          filteredLabValues.map(item => (
            React.createElement("li", { key: item.id, className: "lab-value-item" },
              React.createElement("strong", { className: "lab-value-testname" },
                item.testName,
                item.shortName && ` (${item.shortName})`
              ),
              React.createElement("span", { className: "lab-value-category" }, `Category: ${item.category}`),
              // --- CHANGE #1 START ---
              // Updated to use the nested 'normal' object
              React.createElement("p", { className: "lab-value-range" },
                React.createElement("strong", null, "Range: "),
                item.normal ? `${item.normal.low} - ${item.normal.high}` : 'N/A',
                " ",
                item.unit
              ),
              // --- CHANGE #1 END ---
              item.description && React.createElement("p", { className: "lab-value-description" }, item.description),
              item.notes && React.createElement("p", { className: "lab-value-notes" }, React.createElement("em", null, "Notes: "), item.notes),
              // --- CHANGE #2 START ---
              // Updated to check for and use the nested 'critical' object
              item.critical && (item.critical.low || item.critical.high) && React.createElement("p", { className: "lab-value-critical" },
                React.createElement("strong", null, "Critical: "),
                item.critical.low && `Low < ${item.critical.low} ${item.unit}`,
                item.critical.low && item.critical.high && "; ",
                item.critical.high && `High > ${item.critical.high} ${item.unit}`
              )
              // --- CHANGE #2 END ---
            )
          ))
        ) : (
          React.createElement("li", { className: "no-results-text" }, "No lab values match your search.")
        )
      )
    )
  );
};

const MnemonicsPanel = ({ mnemonics }) => {
  const [searchTermMnemonic, setSearchTermMnemonic] = useState('');

  const filteredMnemonics = useMemo(() => {
    if (!mnemonics || !Array.isArray(mnemonics)) return [];
    if (!searchTermMnemonic.trim()) {
      return mnemonics;
    }
    const lowerSearchTerm = searchTermMnemonic.toLowerCase();
    return mnemonics.filter(item =>
      item.mnemonic.toLowerCase().includes(lowerSearchTerm) ||
      item.standsFor.toLowerCase().includes(lowerSearchTerm) ||
      item.topic.toLowerCase().includes(lowerSearchTerm) ||
      (item.category && item.category.toLowerCase().includes(lowerSearchTerm))
    ).sort((a, b) => a.mnemonic.localeCompare(b.mnemonic));
  }, [mnemonics, searchTermMnemonic]);

  return (
    React.createElement("main", { id: "mnemonics-view", className: "mnemonics-panel calculator-interface-panel", role: "tabpanel", "aria-labelledby": "tab-mnemonics" },
      React.createElement("h3", null, "Medical Mnemonics Collection"),
      React.createElement("div", { className: "search-bar-container" },
        React.createElement("input", {
          type: "search",
          "aria-label": "Search medical mnemonics",
          placeholder: "Search mnemonics (e.g., MUDPILES, APGAR)...",
          className: "calculator-search-input",
          value: searchTermMnemonic,
          onChange: (e) => setSearchTermMnemonic(e.target.value),
        })
      ),
      React.createElement("ul", { className: "mnemonics-list" },
        filteredMnemonics.length > 0 ? (
          filteredMnemonics.map(item => (
            React.createElement("li", { key: item.id, className: "mnemonic-item" },
              React.createElement("strong", { className: "mnemonic-title" }, item.mnemonic),
              React.createElement("p", { className: "mnemonic-stands-for" }, React.createElement("em", null, "Stands for: "), item.standsFor),
              React.createElement("p", { className: "mnemonic-topic" }, React.createElement("em", null, "Topic: "), item.topic),
              item.category && React.createElement("span", { className: "mnemonic-category" }, `Category: ${item.category}`)
            )
          ))
        ) : (
          React.createElement("li", { className: "no-results-text" }, "No mnemonics match your search.")
        )
      )
    )
  );
};

const NutritionGuidePanel = ({ guidelines }) => {
  const [searchTermNutrition, setSearchTermNutrition] = useState('');
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (id) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredGuidelines = useMemo(() => {
    if (!guidelines || !Array.isArray(guidelines)) return [];
    if (!searchTermNutrition.trim()) {
      return guidelines;
    }
    const lowerSearchTerm = searchTermNutrition.toLowerCase();
    return guidelines.filter(item =>
      item.title.toLowerCase().includes(lowerSearchTerm) ||
      (item.content && item.content.some(paragraph => typeof paragraph === 'string' && paragraph.toLowerCase().includes(lowerSearchTerm))) ||
      (item.subsections && item.subsections.some(sub =>
        sub.title.toLowerCase().includes(lowerSearchTerm) ||
        (sub.content && sub.content.some(p => typeof p === 'string' && p.toLowerCase().includes(lowerSearchTerm)))
      ))
    );
  }, [guidelines, searchTermNutrition]);

  const renderContentList = (contentArray, baseKey) => {
    if (!contentArray || !Array.isArray(contentArray)) return null;
    return contentArray.map((item, index) => {
      const itemKey = `${baseKey}-item-${index}`;
      if (typeof item === 'string') {
        return React.createElement("p", { key: itemKey }, item);
      } else if (item && item.type === 'list' && item.items) {
        return React.createElement("ul", { key: itemKey, className: "details-list" },
          item.title && React.createElement("strong", { className: "guideline-list-title" }, item.title),
          item.items.map((li, liIndex) => React.createElement("li", { key: `${itemKey}-li-${liIndex}` }, li))
        );
      }
      return null;
    });
  };

  return (
    React.createElement("main", { id: "nutrition-guide-view", className: "nutrition-guide-panel calculator-interface-panel", role: "tabpanel", "aria-labelledby": "tab-nutrition-guide" },
      React.createElement("h3", null, "Nutrition & Diet Guide"),
      React.createElement("div", { className: "search-bar-container" },
        React.createElement("input", {
          type: "search",
          "aria-label": "Search nutrition guidelines",
          placeholder: "Search guidelines (e.g., Protein, ICU)...",
          className: "calculator-search-input",
          value: searchTermNutrition,
          onChange: (e) => setSearchTermNutrition(e.target.value),
        })
      ),
      React.createElement("p", { className: "lab-values-disclaimer" }, "Important: This information is for general guidance only and not a substitute for personalized advice from a registered dietitian or healthcare provider. Always consult with a qualified professional for dietary recommendations tailored to your specific health needs and conditions."),
      React.createElement("div", { className: "guidelines-list" },
        filteredGuidelines.length > 0 ? (
          filteredGuidelines.map(item => (
            React.createElement("section", { key: item.id, className: "guideline-item" },
              React.createElement("h4", {
                className: "details-subheading guideline-title expandable",
                onClick: () => toggleSection(item.id),
                onKeyDown: (e) => (e.key === 'Enter' || e.key === ' ') && toggleSection(item.id),
                tabIndex: 0,
                role: "button",
                "aria-expanded": !!expandedSections[item.id],
                "aria-controls": `content-nutri-${item.id}`,
              },
                React.createElement("span", { className: "expand-icon", "aria-hidden": "true" }, expandedSections[item.id] ? '▾' : '▸'),
                item.title
              ),
              expandedSections[item.id] && (
                React.createElement("div", { className: "guideline-content-collapsible", id: `content-nutri-${item.id}`, role: "region", "aria-labelledby": `title-nutri-${item.id}` },
                  item.content && renderContentList(item.content, `main-${item.id}`),
                  item.subsections && item.subsections.map(sub => (
                    React.createElement("div", { key: sub.id, className: "guideline-subsection" },
                      React.createElement("h5", { className: "details-subheading guideline-subtitle" }, sub.title),
                      sub.content && renderContentList(sub.content, `sub-${sub.id}`)
                    )
                  ))
                )
              )
            )
          ))
        ) : (
          React.createElement("p", { className: "no-results-text" }, "No guidelines match your search.")
        )
      )
    )
  );
};

const ProceduresPanel = ({ procedures }) => {
  const [searchTermProcedure, setSearchTermProcedure] = useState('');
  const [expandedProcedures, setExpandedProcedures] = useState({});

  const toggleProcedure = (id) => {
    setExpandedProcedures(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProcedures = useMemo(() => {
    if (!procedures || !Array.isArray(procedures)) return [];
    if (!searchTermProcedure.trim()) {
      return procedures.sort((a, b) => a.name.localeCompare(b.name));
    }
    const lowerSearchTerm = searchTermProcedure.toLowerCase();
    return procedures.filter(proc =>
      proc.name.toLowerCase().includes(lowerSearchTerm) ||
      (proc.keywords && Array.isArray(proc.keywords) && proc.keywords.some(k => k.toLowerCase().includes(lowerSearchTerm)))
    ).sort((a, b) => a.name.localeCompare(b.name));
  }, [procedures, searchTermProcedure]);

  const renderProcedureDetail = (detailKey, detailValue, procId, index) => {
    if (!detailValue || (Array.isArray(detailValue) && detailValue.length === 0)) return null;
    const title = detailKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

    return React.createElement("div", { key: `${procId}-${detailKey}-${index}`, className: "procedure-detail-section" },
      React.createElement("h5", { className: "details-subheading guideline-subtitle" }, title),
      Array.isArray(detailValue)
        ? React.createElement("ul", { className: "details-list" }, detailValue.map((item, idx) => React.createElement("li", { key: `${procId}-${detailKey}-item-${idx}` }, item)))
        : React.createElement("p", null, detailValue)
    );
  };

  return (
    React.createElement("main", { id: "procedures-view", className: "procedures-panel calculator-interface-panel", role: "tabpanel", "aria-labelledby": "tab-procedures" },
      React.createElement("h3", null, "Medical Procedure Information"),
      React.createElement("div", { className: "search-bar-container" },
        React.createElement("input", {
          type: "search",
          "aria-label": "Search medical procedures",
          placeholder: "Search procedures (e.g., EGD, Colonoscopy)...",
          className: "calculator-search-input",
          value: searchTermProcedure,
          onChange: (e) => setSearchTermProcedure(e.target.value),
        })
      ),
      React.createElement("p", { className: "lab-values-disclaimer" }, "Disclaimer: This information is for general understanding and educational purposes only. It is not a substitute for professional medical advice, diagnosis, treatment, or performing procedures. Consult with qualified healthcare professionals for any medical concerns or before making any decisions related to your health or treatment."),
      React.createElement("div", { className: "procedures-list" },
        filteredProcedures.length > 0 ? (
          filteredProcedures.map(proc => (
            React.createElement("section", { key: proc.id, className: "procedure-item-container" },
              React.createElement("h4", {
                className: "details-subheading procedure-title expandable",
                onClick: () => toggleProcedure(proc.id),
                onKeyDown: (e) => (e.key === 'Enter' || e.key === ' ') && toggleProcedure(proc.id),
                tabIndex: 0,
                role: "button",
                "aria-expanded": !!expandedProcedures[proc.id],
                "aria-controls": `content-proc-${proc.id}`,
              },
                React.createElement("span", { className: "expand-icon", "aria-hidden": "true" }, expandedProcedures[proc.id] ? '▾' : '▸'),
                proc.name
              ),
              expandedProcedures[proc.id] && (
                React.createElement("div", { className: "procedure-content-collapsible", id: `content-proc-${proc.id}`, role: "region", "aria-labelledby": `title-proc-${proc.id}` },
                  renderProcedureDetail('description', proc.description, proc.id, 0),
                  renderProcedureDetail('indications', proc.indications, proc.id, 1),
                  proc.contraindications && renderProcedureDetail('contraindications', proc.contraindications, proc.id, 2),
                  renderProcedureDetail('preparation', proc.preparation, proc.id, 3),
                  renderProcedureDetail('procedureSteps', proc.procedureSteps, proc.id, 4),
                  renderProcedureDetail('postProcedureCare', proc.postProcedureCare, proc.id, 5),
                  renderProcedureDetail('risksComplications', proc.risksComplications, proc.id, 6),
                  proc.alternatives && renderProcedureDetail('alternatives', proc.alternatives, proc.id, 7),
                  proc.patientInformation && renderProcedureDetail('patientInformation', proc.patientInformation, proc.id, 8),
                  proc.references && renderProcedureDetail('references', proc.references, proc.id, 9)
                )
              )
            )
          ))
        ) : (
          React.createElement("p", { className: "no-results-text" }, "No procedures match your search.")
        )
      )
    )
  );
};

const CalculatorListPanel = ({
  calculators,
  selectedCalculatorId,
  onSelectCalculator,
  searchTerm,
  onSearchChange,
}) => {
  return (
    React.createElement("aside", { id: "calculator-view", className: "calculator-list-panel", role: "tabpanel", "aria-labelledby": "tab-calculators" },
      React.createElement("div", { className: "search-bar-container" },
        React.createElement("input", {
          type: "search",
          "aria-label": "Search calculators",
          placeholder: "Search calculators...",
          className: "calculator-search-input",
          value: searchTerm,
          onChange: (e) => onSearchChange(e.target.value),
        })
      ),
      React.createElement("div", { className: "calculator-select-container" },
        React.createElement("label", { htmlFor: "calculator-select-dropdown", className: "sr-only" }, "Select a calculator"),
        React.createElement("select", {
          id: "calculator-select-dropdown",
          className: "calculator-select",
          value: selectedCalculatorId || "",
          onChange: (e) => onSelectCalculator(e.target.value),
        },
          React.createElement("option", { value: "", disabled: true },
            "-- Select a Calculator --"
          ),
          calculators.map(calc => (
            React.createElement("option", { key: calc.id, value: calc.id },
              calc.name
            )
          ))
        )
      ),
      searchTerm && calculators.length === 0 && (
        React.createElement("p", { className: "no-results-text" }, "No calculators match your search.")
      )
    )
  );
};

const CalculatorInterfacePanel = ({
  selectedCalculator,
  inputValues,
  onInputChange,
  result,
  interpretedResultText,
  currentUnits,
  onUnitChange,
  onClearInputs,
}) => {
  if (!selectedCalculator) {
    return (
      React.createElement("main", { className: "calculator-interface-panel", "aria-live": "polite" },
        React.createElement("p", { className: "placeholder-text" }, "Select a calculator from the list to get started or search for one above.")
      )
    );
  }

  const currentCalcInputs = inputValues || getDefaultInputs(selectedCalculator);
  const currentCalcUnits = currentUnits || getDefaultInputUnits(selectedCalculator);

  return (
    React.createElement("main", { className: "calculator-interface-panel", "aria-labelledby": `calc-title-${selectedCalculator.id}` },
      React.createElement("div", { className: "calculator-title-container" },
        React.createElement("h3", { id: `calc-title-${selectedCalculator.id}` }, selectedCalculator.name),
        selectedCalculator.inputs && selectedCalculator.inputs.length > 0 && (
          React.createElement("button", {
            type: "button",
            className: "clear-inputs-button",
            onClick: () => onClearInputs(selectedCalculator.id),
            title: `Clear all inputs for ${selectedCalculator.name}`,
            "aria-label": `Clear all inputs for ${selectedCalculator.name}`,
          }, "Clear Inputs")
        )
      ),
      React.createElement("form", { onSubmit: (e) => e.preventDefault(), "aria-describedby": `calc-details-${selectedCalculator.id}` },
        selectedCalculator.inputs.map(input => {
          if (selectedCalculator.id === 'montrealIBD') {
            const ibdType = currentCalcInputs['ibdType'] || selectedCalculator.inputs.find(i => i.id === 'ibdType')?.defaultUnit;
            const isCrohnsSelected = ibdType === 'crohns';
            const isUcSelected = ibdType === 'uc';
            const crohnsSpecificInputs = ['crohnsAge', 'crohnsLocation', 'crohnsBehavior', 'crohnsPerianal'];
            const ucSpecificInputs = ['ucExtent'];
            if (crohnsSpecificInputs.includes(input.id) && !isCrohnsSelected) return null;
            if (ucSpecificInputs.includes(input.id) && !isUcSelected) return null;
          }
          if (selectedCalculator.id === 'macroRatio') {
            const ratioProfile = currentCalcInputs['ratioProfile'] || selectedCalculator.inputs.find(i => i.id === 'ratioProfile')?.defaultUnit;
            const isCustom = ratioProfile === 'custom';
            if (input.id.startsWith('custom') && !isCustom) return null;
            if (!input.id.startsWith('custom') && input.id !== 'totalCalories' && input.id !== 'ratioProfile' && isCustom) {
              // This condition seems to be for potentially hiding other fields if custom is selected,
              // but currently does nothing. If specific fields should be hidden, it needs to return null.
              // Keeping as is, as it doesn't break anything.
            }
          }

          return (
            React.createElement(InputGroupComponent, {
              key: input.id,
              calculatorId: selectedCalculator.id,
              input: input,
              value: currentCalcInputs[input.id],
              currentUnit: currentCalcUnits[input.id] || input.defaultUnit,
              onChange: (value) => onInputChange(selectedCalculator.id, input.id, value),
              onUnitChange: (unit) => onUnitChange(selectedCalculator.id, input.id, unit),
            })
          );
        })
      ),
      React.createElement(ResultDisplay, { result: result, unit: selectedCalculator.resultUnit, interpretedText: interpretedResultText, resultLabel: selectedCalculator.resultLabel }),
      React.createElement(CalculatorDetailsDisplay, { details: selectedCalculator.details, calcId: selectedCalculator.id })
    )
  );
};

const InputGroupComponent = ({ calculatorId, input, value, currentUnit, onChange, onUnitChange }) => {
  const uniqueId = `${calculatorId}-${input.id}`;
  const displayLabel = input.label;
  const activeUnit = currentUnit || input.defaultUnit;

  return (
    React.createElement("div", { className: "input-group" },
      React.createElement("label", { htmlFor: uniqueId }, displayLabel),
      React.createElement("div", { className: `input-field-wrapper ${input.supportedUnits && input.supportedUnits.length > 0 ? 'has-units' : ''}` },
        input.type === 'number' ? (
          React.createElement("input", {
            type: "number",
            id: uniqueId,
            value: String(value ?? ''),
            onChange: (e) => onChange(e.target.value),
            min: input.min,
            max: input.max,
            step: input.step || "any",
            placeholder: input.placeholder || (input.defaultUnit && !input.supportedUnits ? input.defaultUnit : ''),
            "aria-required": "true",
            "aria-describedby": input.supportedUnits ? `${uniqueId}-unit-desc` : (input.defaultUnit && !input.supportedUnits ? `${uniqueId}-static-unit-desc` : undefined),
          })
        ) : (
          React.createElement("select", {
            id: uniqueId,
            value: String(value ?? ''),
            onChange: (e) => onChange(e.target.value),
            "aria-required": "true",
          },
            input.options?.map(option => (
              React.createElement("option", { key: String(option.value), value: String(option.value) },
                option.label
              )
            ))
          )
        ),
        input.supportedUnits && input.supportedUnits.length > 0 && (
          React.createElement(React.Fragment, null,
            React.createElement("div", { className: "unit-switcher", role: "radiogroup", "aria-labelledby": `${uniqueId}-unit-label` },
              React.createElement("span", { id: `${uniqueId}-unit-label`, className: "sr-only" }, "Select unit for ", input.label),
              input.supportedUnits.map(unitOpt => (
                React.createElement("button", {
                  key: unitOpt.value,
                  type: "button",
                  role: "radio",
                  "aria-checked": activeUnit === unitOpt.value,
                  className: activeUnit === unitOpt.value ? 'active' : '',
                  onClick: () => onUnitChange(unitOpt.value),
                  "aria-label": `Set unit to ${unitOpt.label}`,
                },
                  unitOpt.label
                )
              ))
            ),
            React.createElement("span", { id: `${uniqueId}-unit-desc`, className: "sr-only" }, "Current unit for ", input.label, " is ", activeUnit && input.supportedUnits.find(u => u.value === activeUnit)?.label || input.defaultUnit)
          )
        ),
        input.defaultUnit && !input.supportedUnits && input.type === 'number' && (
          React.createElement("span", { className: "static-unit-display", id: `${uniqueId}-static-unit-desc` }, input.defaultUnit)
        )
      )
    )
  );
};

const ResultDisplay = ({ result, unit, interpretedText, resultLabel }) => {
  if (result === null || result === undefined || (typeof result === 'string' && result.trim() === "")) return null;

  const isFeedback = typeof result === 'string' && (isNaN(Number(result)) || result.toLowerCase().includes("error") || result.toLowerCase().includes("please fill") || result.toLowerCase().includes("must sum to 100") || result.toLowerCase().includes("cannot be greater") || result.toLowerCase().includes("should be >") || result.toLowerCase().includes("must be positive"));

  let displayResult;
  if (isFeedback) {
    displayResult = React.createElement("p", { className: "result-text-alert" }, React.createElement("span", { className: "value" }, result));
  } else if (typeof result === 'object' && result !== null) { // Handle object results
    displayResult = Object.entries(result)
      .filter(([, value]) => value !== null && value !== undefined)
      .map(([key, value]) => {
        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        const valueUnit = unit && typeof unit === 'object' ? unit[key] : (typeof unit === 'string' ? unit : '');
        return React.createElement("p", { key: key },
          React.createElement("strong", null, `${label}: `),
          React.createElement("span", { className: "value" }, (typeof value === 'number' ? value.toFixed(value % 1 === 0 ? 0 : 2) : value)),
          valueUnit && React.createElement("span", { className: "unit" }, " ", valueUnit)
        );
      });
  } else { // Handle single string or number results
    displayResult = React.createElement("p", null,
      resultLabel && !String(resultLabel).toLowerCase().includes(typeof result === 'number' ? 'score' : '') && !String(resultLabel).toLowerCase().includes('classification') && React.createElement("strong", null, `${resultLabel}: `),
      React.createElement("span", { className: "value" }, (typeof result === 'number' ? result.toFixed(result % 1 === 0 ? 0 : 2) : result)),
      unit && typeof unit === 'string' && React.createElement("span", { className: "unit" }, " ", unit)
    );
  }

  return (
    React.createElement("div", { className: `result-group ${isFeedback ? 'result-feedback' : ''}`, role: "alert", "aria-live": "assertive" },
      React.createElement("h4", null, "Result"),
      displayResult,
      interpretedText && React.createElement("p", { className: "interpreted-result" }, interpretedText)
    )
  );
};

const CalculatorDetailsDisplay = ({ details, calcId }) => {
  if (!details) return null;

  const renderDetailContent = (content) => {
    if (Array.isArray(content)) {
      return React.createElement("ul", { className: "details-list" },
        content.map((item, index) => React.createElement("li", { key: `detail-item-${index}` }, item))
      );
    }
    if (typeof content === 'string' && content.includes('\n')) {
      return React.createElement("p", { className: "details-formula" }, content);
    }
    return React.createElement("p", null, content);
  };

  if (typeof details === 'object' && details !== null) {
    return (
      React.createElement("div", { className: "calculator-details structured-details", id: `calc-details-${calcId}` },
        Object.entries(details).map(([key, value]) => {
          if (!value || (Array.isArray(value) && value.length === 0)) return null;
          const title = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          return (
            React.createElement(React.Fragment, { key: key },
              React.createElement("h4", { className: "details-subheading" }, title),
              renderDetailContent(value)
            )
          );
        })
      )
    );
  }

  return (
    React.createElement("div", { className: "calculator-details", id: `calc-details-${calcId}` },
      React.createElement("h4", { className: "details-subheading" }, "Formula & Notes"),
      React.createElement("p", null, details)
    )
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(React.createElement(React.StrictMode, null, React.createElement(App, null)));
} else {
  console.error("Root container not found. Ensure an element with id='root' exists in your HTML.");
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}