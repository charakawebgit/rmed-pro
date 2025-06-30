import 'package:go_router/go_router.dart';
import 'package:rmed_pro/features/dashboard/ui/dashboard_screen.dart';
// ... import other screens

final goRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/dashboard',
    routes: [
      GoRoute(
        path: '/dashboard',
        builder: (context, state) => const DashboardScreen(),
      ),
      GoRoute(
        path: '/calculator/:id',
        builder: (context, state) {
          final id = state.pathParameters['id']!;
          return CalculatorDetailScreen(calculatorId: id);
        },
      ),
      // ... other routes
    ],
  );
});
