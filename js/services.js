angular.module('hockeyApp.services',['ngResource'])
    .factory('teamDetailService',function($resource) {
        return $resource("http://localhost/mrhl/api/hello/get_custom_posts/?post_type=player&key=team_name_select&value=:id");
    }) // end service

    .factory('sharedServices',function(){
        var sharedService ={};

        sharedService.teamName = '';

        sharedService.getTeamName = function(teamName) {
            this.teamName = teamName;
        };

        return sharedService;
    });

/*
updating a post : http://localhost/mrhl/api/posts/update_post/?nonce=e4cbd9b714&post_type=player&id=20&custom[stats_goals]=500
 */