angular.module('hockeyApp.services',['ngResource'])

    .factory('sharedServices',function(){
        var sharedService ={};
        sharedService.teamName = '';
        sharedService.getTeamName = function(teamName) {
            this.teamName = teamName;
        };
        return sharedService;
    }) // end service

    .factory('teamService',function($http) {
        var promise;
        var allTeams = {
            async: function() {
                if ( !promise ) {
                    var urlBase = 'http://localhost/mrhl/api/get_recent_posts/?post_type=team';
                    promise = $http.jsonp(urlBase +'&callback=JSON_CALLBACK').then(function (response) {
                        return response.data;
                    });
                }
                // Return the promise to the controller
                return promise;
            }
        };
        return allTeams;
    }) // end service

    .factory('teamDetailService',function($resource) {
        return $resource("http://localhost/mrhl/api/keyValue/get_custom_posts/?post_type=team&key=team_name&value=:id");
    }); // end service


/*
updating a post : http://localhost/mrhl/api/posts/update_post/?nonce=e4cbd9b714&post_type=player&id=20&custom[stats_goals]=500
 */