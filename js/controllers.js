angular.module('hockeyApp.controllers', [])

    .controller("teamsController", function($scope, $http, sharedServices) {
        var teamsAPI = [];
        $scope.teams = teamsAPI;
        init();

        function init() {
            var urlBase = 'http://localhost/mrhl/api/get_recent_posts/?post_type=team';
            var teams = $http.jsonp(urlBase +'&callback=JSON_CALLBACK');
            teams.success(function (data) {
                $.each(data.posts, function (i, team) {
                    teamsAPI.push({
                        name: team.custom_fields.team_name[0],
                        division: team.custom_fields.team_tier[0],
                        wins: team.custom_fields.team_win[0],
                        losses: team.custom_fields.team_loss[0],
                        OTlosses: team.custom_fields.team_draw[0],
                        points: team.custom_fields.team_point[0],
                        slug: team.slug
                    })
                });
            });
            teams.error(function (data, status, headers, config) {
                alert('That request didn\'nt work');
            });
        };

        // Click Event to view details of the Team. Team detail controller is a separate controller
        $scope.setTeam = function(teamName) {
            sharedServices.getTeamName(teamName);
        }


    }) //close controller

    .controller('teamDetailController', function($scope, teamDetailService, sharedServices) {
        var teamDetails = [];
        $scope.teamDetail = teamDetails;
        init();
        function init() {
            teamDetailService.get({id: sharedServices.teamName}, function (d) {
                $.each(d.posts, function (i, player) {
                    teamDetails.push({
                        name: player.title_plain,
                        jerseyNumber: player.custom_fields.jersey_number[0],
                        gamesPlayed: player.custom_fields.stats_gp[0],
                        goals: player.custom_fields.stats_goals[0],
                        assists: player.custom_fields.stats_assists[0]
                    })
                });
            });
        }

    }); // close controller












