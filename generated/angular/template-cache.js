angular.module("app").run(["$templateCache", function($templateCache) {

  $templateCache.put("anon/community.html",
    "<nav>\n" +
    "    <div class=\"nav-wrapper\">\n" +
    "      <form>\n" +
    "        <div class=\"input-field center-align\">\n" +
    "          <input id=\"search\" type=\"search\" required>\n" +
    "          <label class=\"label-icon\" for=\"search\"><i class=\"material-icons\">search</i></label>\n" +
    "          <i class=\"material-icons\">close</i>\n" +
    "        </div>\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </nav>\n"
  );

  $templateCache.put("anon/home.html",
    "\n" +
    "  \n"
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
    "<!-- <nav class=\"navbar navbar-default\" role=\"navigation\" ng-controller=\"NavbarController\">\n" +
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
    "                <li ui-sref-active=\"active\"><a ui-sref=\"user.createDefis\" ng-show=\"auth.isAuthenticated()\">Nouveau defi</a></li>\n" +
    "                <li ui-sref-active=\"active\"><a ui-sref=\"user.filterActivity\" ng-show=\"auth.isAuthenticated()\">filter activity</a></li>\n" +
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
    "</nav> -->\n"
  );

  $templateCache.put("anon/register.html",
    "<div class=\"row\">\n" +
    "  <div class=\"welcome\">\n" +
    "    <h2 class=\"titre center-align\">KingPong</h2>\n" +
    "    <p>Pariatur exercitation id excepteur occaecat et labore eu labore reprehenderit ad et esse id in proident. Esse consectetur consectetur mollit adipisicing laborum adipisicing incididunt elit do exercitation. Irure cillum cillum anim voluptate voluptate\n" +
    "      dolore anim amet excepteur id do.</p>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row\">\n" +
    "  <form class=\"col s12 l6 offset-l4 register\" name=\"loginForm\" novalidate ng-submit=\"register()\">\n" +
    "    <div ng-repeat=\"error in errors\">{{error.error}}</div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"input-field col s11 l6  \">\n" +
    "        <i class=\"material-icons prefix\">account_circle</i>\n" +
    "        <input id=\"pseudo\" type=\"text\" class=\"form-control\" ng-model=\"user.pseudo\" required>\n" +
    "        <label for=\"pseudo\">Pseudo</label>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"input-field col s11 l6 \">\n" +
    "        <i class=\"material-icons prefix\">mail</i>\n" +
    "        <input id=\"email\" type=\"email\" class=\"form-control\" ng-model=\"user.email\" required>\n" +
    "        <label for=\"email\">Email</label>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"input-field col s11 l6 \">\n" +
    "        <i class=\"material-icons prefix\">vpn_key</i>\n" +
    "        <input id=\"password\" type=\"password\" class=\"form-control\" ng-model=\"user.password\" required>\n" +
    "        <label for=\"password\">Password</label>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col s12 l6\">\n" +
    "        <a id=\"submit\" ng-click=\"register()\" type=\"submit\" class=\"waves-effect waves-teal btn \">Register</a>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "<!-- <div class=\"row\">\n" +
    "    <div class=\"col-xs-6 col-xs-offset-3\">\n" +
    "        <form class=\"form\" name=\"loginForm\" novalidate ng-submit=\"register()\">\n" +
    "            <div ng-repeat=\"error in errors\">{{error.error}}</div>\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-user\"></i></span>\n" +
    "                <input id=\"email\" type=\"email\" class=\"form-control\" ng-model=\"user.pseudo\" required placeholder=\"Pseudo\">\n" +
    "            </div>\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-addon\"><i class=\"material-icons\">email</i>\n" +
    "                <input id=\"email\" type=\"email\" class=\"form-control\" ng-model=\"user.email\" required placeholder=\"Email Address\">\n" +
    "            </div>\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-lock\"></i></span>\n" +
    "                <input id=\"password\" type=\"password\" class=\"form-control\" ng-model=\"user.password\" required placeholder=\"Password\">\n" +
    "            </div>\n" +
    "            <button type=\"submit\" class=\"btn btn-primary btn-block\">Register</button>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div> -->\n"
  );

  $templateCache.put("user/activityDescription.html",
    "<nav>\n" +
    "    <div class=\"nav-wrapper\">\n" +
    "        <form>\n" +
    "            <i class=\"material-icons\">navigate_before</i>\n" +
    "    </form>\n" +
    "  </div>\n" +
    "</nav>\n" +
    "<div class=\"cadre\">\n" +
    "    <md-subheader class=\"md-no-sticky\">\n" +
    "        <div class =\"photoCat\">\n" +
    "            <img src=\"img/echec.jpg\" alt=\"\" class=\"circle\">\n" +
    "        </div>\n" +
    "        <p>{{activity}}</p>\n" +
    "    </md-subheader><br>\n" +
    "</div>\n" +
    "<md-list>\n" +
    "    <div class=\"row\">\n" +
    "        <form class=\"col s12\">\n" +
    "            <label for=\"activity\">Description</label>\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"input-field col s12\">\n" +
    "                    <input id=\"description\" type=\"text\" class=\"active\" ng-model=\"description\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <label for=\"resultRule\">Règle du resultat</label>\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"input-field col s12\">\n" +
    "                    <input id=\"resultRule\" type=\"text\" class=\"active\" ng-model=\"description\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <label for=\"teamNumber\">Nombre d'équipe</label>\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"input-field col s12\">\n" +
    "                    <input id=\"teamNumber\" type=\"text\" class=\"validate\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <label for=\"playerNumber\">Nombre de joueur par équipe</label>\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"input-field col s12\">\n" +
    "                    <input id=\"playerNumber\" type=\"text\" class=\"validate\">\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "            <label for=\"averageLast\">Durée moyenne</label>\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"input-field col s12\">\n" +
    "                    <input id=\"averageLast\" type=\"text\" class=\"validate\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</md-list>\n" +
    "<a class=\"btn-floating btn-large waves-effect waves-light blue\">+</a>\n"
  );

  $templateCache.put("user/createDefis.html",
    "<nav>\n" +
    "    <div class=\"nav-wrapper\">\n" +
    "      <form>\n" +
    "          <label class=\"label-icon\" for=\"close\"><i class=\"material-icons\">close</i></label>\n" +
    "          <i class=\"material-icons\">close</i>\n" +
    "        </div>\n" +
    "        <div class=\"cadre\">\n" +
    "            <md-subheader class=\"md-no-sticky\">\n" +
    "                <div class =\"photoCat\">\n" +
    "                    <img src=\"img/echec.jpg\" alt=\"\" class=\"circle\">\n" +
    "                </div>\n" +
    "            </md-subheader><br>\n" +
    "        </div>\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </nav>\n" +
    "<br><br>\n" +
    "<div class=\"row\">\n" +
    "    <form class=\"col s12\">\n" +
    "              <label for=\"activity\">Choisir son activités</label>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"input-field col s12\">\n" +
    "                <input placeholder=\"Activités\" id=\"activity\" type=\"text\" class=\"active\" ng-click=\"filterActivity()\" ng-model=\"activity\" >\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <!-- Calendrier datepicker -->\n" +
    "        <label for=\"start\">Début</label>\n" +
    "        <div class=\"row\">            <div class=\"input-field col s12\">\n" +
    "                <div layout-gt-xs=\"row\">\n" +
    "                    <div flex-gt-xs>\n" +
    "                        <md-datepicker ng-model=\"myDate\" md-placeholder=\"Saisir la date\"></md-datepicker>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <label for=\"duration\">Durée</label>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"input-field col s12\">\n" +
    "                <input placeholder=\"Combien de temps durera le défi\" id=\"duration\" type=\"text\" class=\"validate\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <label for=\"where\">Lieu</label>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"input-field col s12\">\n" +
    "                <input placeholder=\"Dans quelle ville se déroulera le défi\" id=\"where\" type=\"text\" class=\"validate\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "<button ng-click=\"add()\"class=\"btn blue\" type=\"button\"><span>   Creer le défi    </span></button>\n" +
    "</div>\n" +
    "\n" +
    "</form>\n"
  );

  $templateCache.put("user/dashboard.html",
    "Dashboard de {{user.email}}\n"
  );

  $templateCache.put("user/home.html",
    ""
  );

  $templateCache.put("user/navbar.html",
    "\n"
  );

  $templateCache.put("user/newDefiActivity.html",
    "<nav>\n" +
    "  <div class=\"nav-wrapper\">\n" +
    "    <form>\n" +
    "      <i class=\"material-icons\">navigate_before</i>\n" +
    "      <div class=\"input-field\">\n" +
    "        <input id=\"search\" type=\"search\" required>\n" +
    "        <label class=\"label-icon\" for=\"search\"><i class=\"material-icons\">search</i></label>\n" +
    "        <i class=\"material-icons\">close</i>\n" +
    "      </div>\n" +
    "    </form>\n" +
    "  </div>\n" +
    "</nav>\n" +
    "<div class=\"cadre\">\n" +
    "<md-subheader class=\"md-no-sticky\"><b>Activités</b></md-subheader><br>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col s12\">\n" +
    "\n" +
    "            <md-list>\n" +
    "            <ul class=\"collection\">\n" +
    "                <li class=\"collection-item\" ng-repeat=\"activ in activitiesList\">\n" +
    "                    <div class=\"md-list-item-text compact\" ng-click=\"addActivity($index)\">{{activ.activity}}\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "          </md-list>\n"
  );

  $templateCache.put("user/profile.html",
    "Profile de {{user.email}}\n"
  );

}]);
