angular.module('hockeyApp.controllers', [])

    .controller('teamsController',function($scope, $modal, teamService) {
        init();

        function init() {
            $scope.teams = teamService.getTeams();
        }
        $scope.teamName = function (obj) {
            var theTeam = '';
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop) && prop == 'name') {
                    theTeam = (obj[prop]);
                }
            }
            return theTeam;
        };

        teamService.updateTeamName($scope.teamName());

    })//close controller

    .controller('teamDetailController', function($scope, $routeParams, $http, teamDetailService) {
        $scope.teamDetails = $routeParams.teamDetails;

        teamDetailService.async().then(function(d) {
            // INITIALIZE THE DATA
            $scope.teamDetailDisplay = function() {
                $scope.teamDetail = [];

                $.each(d, function(i, player) {
                    $scope.teamDetail.push({
                        name: player.title_plain,
                        jerseyNumber: player.custom_fields.jersey_number[0],
                        gamesPlayed: player.custom_fields.stats_gp[0],
                        goals: player.custom_fields.stats_goals[0],
                        assists: player.custom_fields.stats_assists[0]
                    })
                });
            };
            $scope.teamDetailDisplay();
        }); // close async

    }); // close controller












