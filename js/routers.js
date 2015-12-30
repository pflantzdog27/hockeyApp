angular.module('hockeyApp.routers', ['ngRoute','ngAnimate'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'homeController',
                templateUrl: 'partials/home.html'
            })
            .when('/league-leaders', {
                templateUrl: 'partials/league-leaders.html',
                controller: 'leagueLeadersController'
            })
            .when('/teams', {
                templateUrl: 'partials/teams.html',
                controller: 'teamsController'
            })
            .when('/teams/:teamDetail', {
                templateUrl: 'partials/team-details.html',
                controller: 'teamDetailController'
            })
            .when('/schedules', {
                templateUrl: 'partials/schedules.html',
                controller: 'schedulesController'
            })
            .when('/standings', {
                controller: 'playerStatsController',
                templateUrl: 'partials/standings.html'
            })
            .otherwise({ redirectTo: '/'})
    });
