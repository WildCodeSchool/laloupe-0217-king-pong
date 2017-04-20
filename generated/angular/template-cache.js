angular.module("app").run(["$templateCache", function($templateCache) {

  $templateCache.put("anon/home.html",
    "<h1>Hello World</h1>\n" +
    "<p>help</p>\n" +
    "\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"input-field col s4\">\n" +
    "    <ul class=\"collection\">\n" +
    "     <li class=\"collection-item avatar\">\n" +
    "       <img src=\"img/foot.jpg\" alt=\"\" class=\"circle\">\n" +
    "       <p>Foot de rue<br>\n" +
    "       </p>\n" +
    "     </li>\n" +
    "     <li class=\"collection-item avatar\">\n" +
    "      <img src=\"img/echec.jpg\" alt=\"\" class=\"circle\">\n" +
    "       <p>Echecs<br>\n" +
    "       </p>\n" +
    "     </li>\n" +
    "     <li class=\"collection-item avatar\">\n" +
    "       <i class=\"material-icons circle green\">insert_chart</i>\n" +
    "       <p>Tennis de rue<br>\n" +
    "       </p>\n" +
    "     </li>\n" +
    "     <li class=\"collection-item avatar\">\n" +
    "       <i class=\"material-icons circle red\">play_arrow</i>\n" +
    "       <p>Ping pong de rue<br>\n" +
    "       </p>\n" +
    "     </li>\n" +
    "   </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );

  $templateCache.put("anon/login.html",
    "<div class=\"row\">\n" +
    "    <div class=\"col-xs-6 col-xs-offset-3\">\n" +
    "        <form class=\"form\" name=\"loginForm\" novalidate ng-submit=\"login()\">\n" +
    "            <div ng-repeat=\"error in errors\">{{error.error}}</div>\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-user\"></i></span>\n" +
    "                <input id=\"email\" type=\"email\" class=\"form-control\" ng-model=\"user.email\" required placeholder=\"Email Address\">\n" +
    "            </div>\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-lock\"></i></span>\n" +
    "                <input id=\"password\" type=\"password\" class=\"form-control\" ng-model=\"user.password\" required placeholder=\"Password\">\n" +
    "            </div>\n" +
    "            <button type=\"submit\" class=\"btn btn-primary btn-block\">Login</button>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>\n"
  );

  $templateCache.put("anon/navbar.html",
    "<nav class=\"navbar navbar-default\" role=\"navigation\" ng-controller=\"NavbarController\">\n" +
    "    <div class=\"container-fluid\">\n" +
    "        <div class=\"navbar-header\">\n" +
    "            <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#navbar\">\n" +
    "        <span class=\"sr-only\">Toggle navigation</span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "      </button>\n" +
    "            <a class=\"navbar-brand\" href=\"#\"></a>\n" +
    "        </div>\n" +
    "        <div class=\"collapse navbar-collapse\" id=\"navbar\">\n" +
    "            <ul class=\"nav navbar-nav\">\n" +
    "                <li ui-sref-active=\"active\"><a ui-sref=\"anon.home\">Home</a></li>\n" +
    "\n" +
    "            </ul>\n" +
    "            <ul class=\"nav navbar-nav navbar-right\">\n" +
    "                <li>\n" +
    "                    <li ui-sref-active=\"active\"><a ui-sref=\"anon.login\" ng-hide=\"auth.isAuthenticated()\">Login</a></li>\n" +
    "                    <li ui-sref-active=\"active\"><a ui-sref=\"anon.register\" ng-hide=\"auth.isAuthenticated()\">Register</a></li>\n" +
    "                    <li ui-sref-active=\"active\"><a ui-sref=\"user.dashboard\" ng-show=\"auth.isAuthenticated()\">Dashboard</a></li>\n" +
    "                    <li><a ng-click=\"logout()\" ng-show=\"auth.isAuthenticated()\" href='#'>Logout</a></li>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</nav>\n"
  );

  $templateCache.put("anon/register.html",
    "<div class=\"row\">\n" +
    "    <div class=\"col-xs-6 col-xs-offset-3\">\n" +
    "        <form class=\"form\" name=\"loginForm\" novalidate ng-submit=\"register()\">\n" +
    "            <div ng-repeat=\"error in errors\">{{error.error}}</div>\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-user\"></i></span>\n" +
    "                <input id=\"email\" type=\"email\" class=\"form-control\" ng-model=\"user.email\" required placeholder=\"Email Address\">\n" +
    "            </div>\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-lock\"></i></span>\n" +
    "                <input id=\"password\" type=\"password\" class=\"form-control\" ng-model=\"user.password\" required placeholder=\"Password\">\n" +
    "            </div>\n" +
    "            <button type=\"submit\" class=\"btn btn-primary btn-block\">Register</button>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>\n"
  );

  $templateCache.put("user/createDefis.html",
    "<div class=\"row\">\n" +
    "    <form class=\"col s12\">\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"input-field col s4\">\n" +
    "          <input placeholder=\"Activités\" id=\"activity\" type=\"text\" class=\"validate\">\n" +
    "          <label for=\"activity\">Choisir son activités</label>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"input-field col s4\">\n" +
    "          <input placeholder=\"Date de début de mon activité\" id=\"start\" type=\"text\" class=\"validate\">\n" +
    "          <label for=\"start\">Début</label>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"input-field col s4\">\n" +
    "          <input placeholder=\"Combien de temps durera le défi\" id=\"duration\" type=\"text\" class=\"validate\">\n" +
    "          <label for=\"duration\">Durée</label>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"input-field col s4\">\n" +
    "          <input placeholder=\"Dans quelle ville se déroulera le défi\" id=\"where\" type=\"text\" class=\"validate\">\n" +
    "          <label for=\"where\">Lieu</label>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"row\">\n" +
    "          <p>PARTICIPANTS</p>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"input-field col s4\">\n" +
    "          <input placeholder=\"Combien d'équipes peuvent participer\" id=\"team\" type=\"text\" class=\"validate\">\n" +
    "          <label for=\"team\">Nombre de groupes</label>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"input-field col s4\">\n" +
    "          <input placeholder=\"Combien de joueurs peuvent participer\" id=\"player\" type=\"text\" class=\"validate\">\n" +
    "          <label for=\"player\">Nombre de participants par groupe</label>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"input-field col s4\">\n" +
    "          <input placeholder=\"Combien d'équipes peuvent participer\" id=\"invite\" type=\"text\" class=\"validate\">\n" +
    "          <label for=\"invite\">Invitation</label>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      </form>\n"
  );

  $templateCache.put("user/dashboard.html",
    "Dashboard de {{user.email}}\n"
  );

  $templateCache.put("user/navbar.html",
    "<nav class=\"navbar navbar-default\" role=\"navigation\" ng-controller=\"NavbarController\">\n" +
    "    <div class=\"container-fluid\">\n" +
    "        <div class=\"navbar-header\">\n" +
    "            <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#navbar\">\n" +
    "        <span class=\"sr-only\">Toggle navigation</span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "      </button>\n" +
    "            <a class=\"navbar-brand\" href=\"#\"></a>\n" +
    "        </div>\n" +
    "        <div class=\"collapse navbar-collapse\" id=\"navbar\">\n" +
    "            <ul class=\"nav navbar-nav\">\n" +
    "                <li ui-sref-active=\"active\"><a ui-sref=\"user.dashboard\" ng-show=\"auth.isAuthenticated()\">Dashboard</a></li>\n" +
    "                <li ui-sref-active=\"active\"><a ui-sref=\"user.profile\" ng-show=\"auth.isAuthenticated()\">Profile</a></li>\n" +
    "                <li ui-sref-active=\"active\"><a ui-sref=\"user.createDefis\" ng-show=\"auth.isAuthenticated()\">Nouveau defi</a></li>\n" +
    "            </ul>\n" +
    "            <ul class=\"nav navbar-nav navbar-right\">\n" +
    "                <li>\n" +
    "                    <li ui-sref-active=\"active\"><a ui-sref=\"anon.home\">Website</a></li>\n" +
    "                    <li><a ng-click=\"logout()\" ng-show=\"auth.isAuthenticated()\" href='#'>Logout</a></li>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</nav>\n"
  );

  $templateCache.put("user/newDefiActivity.html",
    "<div class=\"row\">\n" +
    "    <form class=\"col s12\">\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"input-field col s4\">\n" +
    "          <input placeholder=\"Activités\" id=\"activity\" type=\"text\" class=\"validate\">\n" +
    "          <label for=\"activity\">Choisir son activités</label>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"input-field col s4\">\n" +
    "          <input placeholder=\"Date de début de mon activité\" id=\"start\" type=\"text\" class=\"validate\">\n" +
    "          <label for=\"start\">Début</label>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"input-field col s4\">\n" +
    "          <input placeholder=\"Combien de temps durera le défi\" id=\"duration\" type=\"text\" class=\"validate\">\n" +
    "          <label for=\"duration\">Durée</label>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"input-field col s4\">\n" +
    "          <input placeholder=\"Dans quelle ville se déroulera le défi\" id=\"where\" type=\"text\" class=\"validate\">\n" +
    "          <label for=\"where\">Lieu</label>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"row\">\n" +
    "          <p>PARTICIPANTS</p>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"input-field col s4\">\n" +
    "          <input placeholder=\"Combien d'équipes peuvent participer\" id=\"team\" type=\"text\" class=\"validate\">\n" +
    "          <label for=\"team\">Nombre de groupes</label>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"input-field col s4\">\n" +
    "          <input placeholder=\"Combien de joueurs peuvent participer\" id=\"player\" type=\"text\" class=\"validate\">\n" +
    "          <label for=\"player\">Nombre de participants par groupe</label>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"input-field col s4\">\n" +
    "          <input placeholder=\"Combien d'équipes peuvent participer\" id=\"invite\" type=\"text\" class=\"validate\">\n" +
    "          <label for=\"invite\">Invitation</label>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "        </form>\n"
  );

  $templateCache.put("user/profile.html",
    "Profile de {{user.email}}\n"
  );

}]);
