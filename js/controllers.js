angular.module('hockeyApp.controllers', [])
    ///////////////////  HOME  //////////////////////////
    .controller("homeController", function($scope, $http) {

    }) //close controller
///////////////////  TEAMS  //////////////////////////
    .controller("teamsController", function($scope, $http, sharedServices, teamService) {
        var teamsAPI = [];
        init();

        function init() {
            teamService.async().then(function (data) {
                $.each(data.posts, function (i, team) {
                    teamsAPI.push({
                        name: team.acf.team_name,
                        division: team.acf.team_division,
                        wins: team.acf.team_win,
                        losses: team.acf.team_loss,
                        OTlosses: team.acf.team_otl,
                        points: (team.acf.team_win * 2) + parseInt(team.acf.team_otl),
                        slug: team.slug,
                        gamesPlayed : parseInt(team.acf.team_otl) + parseInt(team.acf.team_win) + parseInt(team.acf.team_loss),
                        goalsFor : team.acf.team_goals_for,
                        goalsAgainst : team.acf.team_goals_against
                    })
                });
                $scope.teams = teamsAPI;
            });
        }

        // Click Event to view details of the Team. Team detail controller is a separate controller
        $scope.setTeam = function(teamName) {
            sharedServices.getTeamName(teamName);
        };
        //Division filter and display
        $scope.displayDivision = 1;
        $scope.filterDivision = null;
        $scope.getDivision = function() {
            $scope.displayDivision = $scope.divisionObject.division;
            $scope.filterDivision = {division : $scope.displayDivision};
        };
    }) //close controller

///////////////////  TEAMS DETAILS  //////////////////////////
    .controller('teamDetailController', function($scope, teamDetailService, sharedServices, $routeParams) {
        var teamDetails = [];
        var teamNameID = sharedServices.teamName.length != 0 ? sharedServices.teamName : $routeParams.teamDetail;
        $scope.nameOfTeam = teamNameID;
        init();

        function init() {
            teamDetailService.get({id: teamNameID }, function (d) {
                var players = d.posts[0].acf.team_players;
                $.each(players, function (i, player) {
                    teamDetails.push({
                        name: player.team_player_name,
                        jerseyNumber: player.team_jersey_number,
                        gamesPlayed: player.team_stats_gp,
                        goals: player.team_stats_goals,
                        assists: player.team_stats_assists,
                        points : parseInt(player.team_stats_goals) + parseInt(player.team_stats_assists),
                        ppg : (parseInt(player.team_stats_goals) + parseInt(player.team_stats_assists)) / player.team_stats_gp,
                        gwg : player.team_stats_gwg,
                        pim : player.team_stats_pim
                    });
                });
                $scope.teamDetail = teamDetails;
            });
        }
    }) // close controller
///////////////////  LEAGUE LEADERS  //////////////////////////
    .controller('leagueLeadersController', function($scope, teamService) {
        $scope.leaders = [];

        teamService.async().then(function (d) {
            $.each(d.posts, function (i, team) {
                var teamDivision = team.acf.team_division;
                var teamName = team.acf.team_name;
                $.each(team.acf.team_players, function (el, player) {
                    $scope.leaders.push({
                        playerName: player.team_player_name,
                        gp: player.team_stats_gp,
                        goals: player.team_stats_goals,
                        assists: player.team_stats_assists,
                        points: parseInt(player.team_stats_goals) + parseInt(player.team_stats_assists),
                        team: teamName,
                        division: teamDivision,
                        ppg: (parseInt(player.team_stats_goals) + parseInt(player.team_stats_assists)) / player.team_stats_gp,
                        gwg: player.team_stats_gwg,
                        pim: player.team_stats_pim
                    });
                });
            });
        });
        //Division filter and display
        $scope.displayDivision = 1;
        $scope.filterDivision = {division : $scope.displayDivision};
        $scope.getDivision = function() {
            $scope.displayDivision = $scope.divisionObject.division;
            $scope.filterDivision = {division : $scope.displayDivision};
        };
    }) // close controller
///////////////////  SCHEDULES  //////////////////////////
    .controller("schedulesController", function($scope, $http, sharedServices, teamService) {
        var schedulesAPI = [];
        init();

        function init() {
            teamService.async().then(function (data) {
                $.each(data.posts, function (i, team) {
                    var teamName = team.acf.team_name;
                    var thisSlug = team.slug;
                    $.each(team.acf.team_schedule, function (el, schedule) {
                        var otherSlug = schedule.schedule_game_opponent.replace(/\s+/g, '-').toLowerCase();
                        schedulesAPI.push({
                            team: teamName,
                            date: schedule.schedule_game_date,
                            opponent: schedule.schedule_game_opponent,
                            type: schedule.schedule_game_type,
                            opponentSlug: thisSlug,
                            currentSlug : otherSlug
                        })
                    });
                });


                // ADD AN EACH WITHIN EACH
                $scope.schedulesAPI = schedulesAPI;
            });
        }
        // Click Event to view details of the Team. Team detail controller is a separate controller
        $scope.setTeam = function(teamName) {
            sharedServices.getTeamName(teamName);
        };
        // current time
        $scope.currentTime = Date.now() / 1000 | 0;


    }) //close controller








