angular.module('hockeyApp.services',[])
    .factory('teamService',function($http, $rootScope) {
        var teamsAPI = [];
        var urlBase = 'http://localhost/mrhl/api/get_recent_posts/?post_type=team';
        var teams = $http.jsonp(urlBase +'&callback=JSON_CALLBACK');
        teams.success(function(data) {
            $.each(data.posts, function(i, team) {
                teamsAPI.push({
                    name: team.custom_fields.team_name[0],
                    division: team.custom_fields.team_tier[0],
                    wins : team.custom_fields.team_win[0],
                    losses : team.custom_fields.team_loss[0],
                    OTlosses : team.custom_fields.team_draw[0],
                    points : team.custom_fields.team_point[0],
                    slug : team.slug
                })
            });
        });

        var factory = {};
        factory.getTeams = function () {
            return teamsAPI;
        };
        //
        factory.updateTeamName = function(team){
            return  $rootScope.teamValue = team;
        };

        return factory;
    }) // end service

    .factory('teamDetailService',function($http, $rootScope) {
        var team = $rootScope.teamValue;
        var urlBase = 'http://localhost/mrhl/api/hello/get_custom_posts/?post_type=player&key=team_name_select&value='+team;
        console.log(urlBase);
        var promise;
        var myService = {
            async: function() {
                if ( !promise ) {
                    promise = $http.jsonp(urlBase +'&callback=JSON_CALLBACK').then(function (data) {
                        return data.data.posts;
                    });
                }
                return promise;
            }
        };
        return myService;
    }); // end service


/*
updating a post : http://localhost/mrhl/api/posts/update_post/?nonce=e4cbd9b714&post_type=player&id=20&custom[stats_goals]=500
 */