angular.module('hockeyApp.router', ['ngRoute','ngAnimate'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'teamsController',
                templateUrl: 'partials/home.html'
            })
            .when('/stats', {
                controller: 'playerStatsController',
                templateUrl: 'partials/stats.html'
            })
            .when('/teams', {
                controller: 'teamsController',
                templateUrl: 'partials/teams.html'
            })
            .when('/teams/:teamDetail', {
                templateUrl: 'partials/team-details.html',
                controller: 'teamDetailController'
            })
            .when('/schedules', {
                controller: 'playerStatsController',
                templateUrl: 'partials/schedules.html'
            })
            .when('/standings', {
                controller: 'playerStatsController',
                templateUrl: 'partials/standings.html'
            })
            .otherwise({ redirectTo: '/'})
    });
