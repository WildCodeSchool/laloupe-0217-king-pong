angular.module("app").run(["$templateCache", function($templateCache) {

  $templateCache.put("anon/community.html",
    "<nav>\n" +
    "  <div class=\"nav-wrapper\">\n" +
    "    <form>\n" +
    "      <div class=\"input-field center-align\">\n" +
    "        <input id=\"search\" type=\"search\" required>\n" +
    "        <label class=\"label-icon\" for=\"search\"><i class=\"material-icons\">search</i></label>\n" +
    "        <i class=\"material-icons\">close</i>\n" +
    "      </div>\n" +
    "    </form>\n" +
    "  </div>\n" +
    "</nav>\n" +
    "<md-toolbar layout=\"row\" class=\"md-hue-3\">\n" +
    "  <div class=\"md-toolbar-tools \">\n" +
    "    Community\n" +
    "  </div>\n" +
    "</md-toolbar>\n" +
    "\n" +
    "\n" +
    "<md-list>\n" +
    "  <md-list-item class=\"md-2-line\" ng-repeat=\"community in communitys track by $index\" ng-click=\"addCommunity(community._id)\">\n" +
    "    <div  class=\"md-list-item-text\">\n" +
    "      <h3>{{community.name}}</h3>\n" +
    "      <p>{{community.location}}</p>\n" +
    "    </div>\n" +
    "  </md-list-item>\n" +
    "</md-list>\n"
  );

  $templateCache.put("anon/home.html",
    "<nav class=\"nav-extended\">\n" +
    "    <div class=\"col s12\">\n" +
    "        <div class=\"nav-wrapper\">\n" +
    "            <a href=\"#\" class=\"brand-logo\">Logo</a>\n" +
    "            <a href=\"#\" data-activates=\"mobile-demo\" class=\"button-collapse\"><i class=\"\">menu</i></a>\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "        <div class=\"nav-content\">\n" +
    "            <ul class=\"tabs tabs-transparent\">\n" +
    "                <li class=\"tab\"><a href=\"#test1\">Defi</a></li>\n" +
    "                <li class=\"tab\"><a class=\"active\" href=\"#test2\">Classement</a></li>\n" +
    "\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</nav>\n" +
    "\n" +
    "\n" +
    "<div class=\"invitation\">\n" +
    "    <h1>Invitation</h1></div>\n" +
    "<div class=\"carousel carousel-slider center\" data-indicators=\"true\">\n" +
    "\n" +
    "    <div class=\"carousel-item \" href=\"#one!\">\n" +
    "        <div class=\"card\">\n" +
    "          <div class=\"challenge\" ng-repeat =\"media in challenge\">\n" +
    "              <img class=\"activator\" ng-src =\"{{challenge.url}}\">\n" +
    "            </div>\n" +
    "            <div class=\"card-content\">\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"card-reveal\">\n" +
    "                <span class=\"card-title grey-text text-darken-4\">Card Title<i class=\"material-icons right\">close</i></span>\n" +
    "                <p>Here is some more information about this product that is only revealed once clicked on.</p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"carousel-item \" href=\"#two!\">\n" +
    "        <div class=\"card\">\n" +
    "            <div class=\"card-image waves-effect waves-block waves-light\">\n" +
    "                <img class=\"activator\" src=\"./img/boardGames.jpg\">\n" +
    "            </div>\n" +
    "            <div class=\"card-content\">\n" +
    "                <span class=\"card-title activator grey-text text-darken-4\">Card Title<i class=\"material-icons right\">more_vert</i></span>\n" +
    "                <p><a href=\"#\">This is a link</a></p>\n" +
    "            </div>\n" +
    "            <div class=\"card-reveal\">\n" +
    "                <span class=\"card-title grey-text text-darken-4\">Card Title<i class=\"material-icons right\">close</i></span>\n" +
    "                <p>Here is some more information about this product that is only revealed once clicked on.</p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "    <div class=\"carousel-item \" href=\"#three!\">\n" +
    "        <div class=\"card\">\n" +
    "            <div class=\"card-image waves-effect waves-block waves-light\">\n" +
    "                <img class=\"activator\" src=\"./img/ping-pong.jpg\">\n" +
    "            </div>\n" +
    "            <div class=\"card-content\">\n" +
    "                <span class=\"card-title activator grey-text text-darken-4\">Card Title<i class=\"material-icons right\">more_vert</i></span>\n" +
    "                <p><a href=\"#\">This is a link</a></p>\n" +
    "            </div>\n" +
    "            <div class=\"card-reveal\">\n" +
    "                <span class=\"card-title grey-text text-darken-4\">Card Title<i class=\"material-icons right\">close</i></span>\n" +
    "                <p>Here is some more information about this product that is only revealed once clicked on.</p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"carousel-item\" href=\"#four!\">\n" +
    "        <div class=\"card\">\n" +
    "            <div class=\"card-image waves-effect waves-block waves-light\">\n" +
    "                <img class=\"activator\" src=\"./img/jeuxVideo.jpg\">\n" +
    "            </div>\n" +
    "            <div class=\"card-content\">\n" +
    "                <span class=\"card-title activator grey-text text-darken-4\">Card Title<i class=\"material-icons right\">more_vert</i></span>\n" +
    "                <p><a href=\"#\">This is a link</a></p>\n" +
    "            </div>\n" +
    "            <div class=\"card-reveal\">\n" +
    "                <span class=\"card-title grey-text text-darken-4\">Card Title<i class=\"material-icons right\">close</i></span>\n" +
    "                <p>Here is some more information about this product that is only revealed once clicked on.</p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row\">\n" +
    "\n" +
    "    <div class=\"col s6 arbitrage\">\n" +
    "        <h1>Arbitrage</h1></div>\n" +
    "    <div class=\"col s6 flotingButton\">\n" +
    "        <a class=\"btn-floating btn-large waves-effect waves-light blue\">\n" +
    "            <i class=\"material-icons\">add</i></a>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "<div class=\"arbitrage\">\n" +
    "</div>\n" +
    "<div class=\"carousel carousel-slider center\" data-indicators=\"true\">\n" +
    "\n" +
    "    <div class=\"carousel-item \" href=\"#one!\">\n" +
    "        <div class=\"card\">\n" +
    "            <div class=\"card-image waves-effect waves-block waves-light\">\n" +
    "                <img class=\"activator\" src=\"./img/foot.jpg\">\n" +
    "            </div>\n" +
    "            <div class=\"card-content\">\n" +
    "                <span class=\"card-title activator grey-text text-darken-4\">Card Title<i class=\"material-icons right\">more_vert</i></span>\n" +
    "                <p><a href=\"#\">This is a link</a></p>\n" +
    "            </div>\n" +
    "            <div class=\"card-reveal\">\n" +
    "                <span class=\"card-title grey-text text-darken-4\">Card Title<i class=\"material-icons right\">close</i></span>\n" +
    "                <p>Here is some more information about this product that is only revealed once clicked on.</p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "    <div class=\"carousel-item \" href=\"#two!\">\n" +
    "        <div class=\"card\">\n" +
    "            <div class=\"card-image waves-effect waves-block waves-light\">\n" +
    "                <img class=\"activator\" src=\"./img/boardGames.jpg\">\n" +
    "            </div>\n" +
    "            <div class=\"card-content\">\n" +
    "                <span class=\"card-title activator grey-text text-darken-4\">Card Title<i class=\"material-icons right\">more_vert</i></span>\n" +
    "                <p><a href=\"#\">This is a link</a></p>\n" +
    "            </div>\n" +
    "            <div class=\"card-reveal\">\n" +
    "                <span class=\"card-title grey-text text-darken-4\">Card Title<i class=\"material-icons right\">close</i></span>\n" +
    "                <p>Here is some more information about this product that is only revealed once clicked on.</p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "    <div class=\"carousel-item \" href=\"#three!\">\n" +
    "        <div class=\"card\">\n" +
    "            <div class=\"card-image waves-effect waves-block waves-light\">\n" +
    "                <img class=\"activator\" src=\"./img/ping-pong.jpg\">\n" +
    "            </div>\n" +
    "            <div class=\"card-content\">\n" +
    "                <span class=\"card-title activator grey-text text-darken-4\">Card Title<i class=\"material-icons right\">more_vert</i></span>\n" +
    "                <p><a href=\"#\">This is a link</a></p>\n" +
    "            </div>\n" +
    "            <div class=\"card-reveal\">\n" +
    "                <span class=\"card-title grey-text text-darken-4\">Card Title<i class=\"material-icons right\">close</i></span>\n" +
    "                <p>Here is some more information about this product that is only revealed once clicked on.</p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"carousel-item\" href=\"#four!\">\n" +
    "        <div class=\"card\">\n" +
    "            <div class=\"card-image waves-effect waves-block waves-light\">\n" +
    "                <img class=\"activator\" src=\"./img/jeuxVideo.jpg\">\n" +
    "            </div>\n" +
    "            <div class=\"card-content\">\n" +
    "                <span class=\"card-title activator grey-text text-darken-4\">Card Title<i class=\"material-icons right\">more_vert</i></span>\n" +
    "                <p><a href=\"#\">This is a link</a></p>\n" +
    "            </div>\n" +
    "            <div class=\"card-reveal\">\n" +
    "                <span class=\"card-title grey-text text-darken-4\">Card Title<i class=\"material-icons right\">close</i></span>\n" +
    "                <p>Here is some more information about this product that is only revealed once clicked on.</p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "</div>\n"
  );

  $templateCache.put("anon/login.html",
    "<div class=\"row\">\n" +
    "  <div class=\"welcomeLogin background z-depth-3\">\n" +
    "    <h1 class=\"titre center-align \">KingPong</h1>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <form class=\"col s12 offset-l4 l4 login\" name=\"loginForm\" novalidate ng-submit=\"login()\">\n" +
    "    <div ng-repeat=\"error in errors\">{{error.error}}</div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"input-field col s11 offset-l1 l10 \">\n" +
    "        <i class=\"material-icons prefix\">mail</i>\n" +
    "        <input id=\"email\" type=\"email\" class=\"form-control\" ng-model=\"user.email\" required>\n" +
    "        <label for=\"email\">Email</label>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"input-field col s11 offset-l1 l10 \">\n" +
    "        <i class=\"material-icons prefix\">vpn_key</i>\n" +
    "        <input id=\"password\" type=\"password\" class=\"form-control\" ng-model=\"user.password\" required>\n" +
    "        <label for=\"password\">Password</label>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col col s12 offset-l1 l10\">\n" +
    "        <a id=\"submit\" ng-click=\"login()\" type=\"submit\" class=\"waves-effect waves-teal btn \">Login</a>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n" +
    "<footer>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col s12 offset-l4 l4 center-align\">\n" +
    "      <ul>\n" +
    "        <li>Vous n’avez pas de compte?</li>\n" +
    "        <li><a class=\"center-align\" ui-sref='anon.register'>Inscrivez-vous</a></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</footer>\n"
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
    "  <div class=\"welcomeRegister background z-depth-3\">\n" +
    "    <h2 class=\"titre center-align \">KingPong</h2>\n" +
    "    <p>Pariatur exercitation id excepteur occaecat et labore eu labore reprehenderit ad et esse id in proident. Esse consectetur consectetur mollit adipisicing laborum adipisicing incididunt elit do exercitation.</p>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <form class=\"col s12 offset-l4 l4 register\" name=\"loginForm\" novalidate ng-submit=\"register()\">\n" +
    "    <div ng-repeat=\"error in errors\">{{error.error}}</div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"input-field col s11 offset-l1 l10  \">\n" +
    "        <i class=\"material-icons prefix\">account_circle</i>\n" +
    "        <input id=\"pseudo\" type=\"text\" class=\"form-control\" ng-model=\"user.pseudo\" required>\n" +
    "        <label for=\"pseudo\">Pseudo</label>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"input-field col s11 offset-l1 l10  \">\n" +
    "        <i class=\"material-icons prefix\">mail</i>\n" +
    "        <input id=\"email\" type=\"email\" class=\"form-control\" ng-model=\"user.email\" required>\n" +
    "        <label for=\"email\">Email</label>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"input-field col s11 offset-l1 l10  \">\n" +
    "        <i class=\"material-icons prefix\">vpn_key</i>\n" +
    "        <input id=\"password\" type=\"password\" class=\"form-control\" ng-model=\"user.password\" required>\n" +
    "        <label for=\"password\">Password</label>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col col s12 offset-l1 l10 \">\n" +
    "        <a id=\"submit\" ng-click=\"register()\" type=\"submit\" class=\"waves-effect waves-teal btn \">Register</a>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n" +
    "<footer>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col s12 offset-l4 l4 center-align\">\n" +
    "      <ul>\n" +
    "        <li>Vous avez un compte ?</li>\n" +
    "        <li><a class=\"center-align\" ui-sref='anon.login'>Connectez-vous</a></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</footer>\n"
  );

  $templateCache.put("user/activityDescription.html",
    "<div class=\"row\">\n" +
    "    <div class=\"col s12\">\n" +
    "        <md-list>\n" +
    "            <a class=\"btn-floating btn-large waves-effect waves-light blue\">+</a>\n" +
    "            <md-subheader class=\"md-no-sticky\">\n" +
    "              <p>{{activity}}</p>\n" +
    "            </md-subheader><br>\n" +
    "            <div class=\"row\">\n" +
    "                <form class=\"col s12\">\n" +
    "                    <label for=\"activity\">Description</label>\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"input-field col s12\">\n" +
    "                            <input id=\"description\" type=\"text\" class=\"active\" ng-model=\"description\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <label for=\"resultRule\">Règle du resultat</label>\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"input-field col s12\">\n" +
    "                            <input  id=\"resultRule\" type=\"text\" class=\"validate\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <label for=\"teamNumber\">Nombre d'équipe</label>\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"input-field col s12\">\n" +
    "                            <input id=\"teamNumber\" type=\"text\" class=\"validate\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <!-- <div class=\"row\">\n" +
    "                        <p>PARTICIPANTS</p>\n" +
    "                    </div> -->\n" +
    "            </div>\n" +
    "            <label for=\"playerNumber\">Nombre de joueur par équipe</label>\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"input-field col s12\">\n" +
    "                    <input  id=\"playerNumber\" type=\"text\" class=\"validate\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <label for=\"averageLast\">Durée moyenne</label>\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"input-field col s12\">\n" +
    "                    <input  id=\"averageLast\" type=\"text\" class=\"validate\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            </form>\n"
  );

  $templateCache.put("user/createDefis.html",
    "<a class=\"btn-floating btn-large waves-effect waves-light blue\">+</a>\n" +
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
    "<button class=\"btn blue\" type=\"button\"><span>   Creer le défi    </span></button>\n" +
    "</div>\n" +
    "\n" +
    "</form>\n"
  );

  $templateCache.put("user/dashboard.html",
    "Dashboard de {{user.email}}\n"
  );

  $templateCache.put("user/home.html",
    "\n"
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
    "              \n" +
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
    "    <div class=\"col s12\">\n" +
    "        <md-list>\n" +
    "            <md-subheader class=\"md-no-sticky\"><b>Activités</b></md-subheader><br>\n" +
    "            <ul class=\"collection\">\n" +
    "                <li class=\"collection-item\" ng-repeat=\"activ in activitiesList\">\n" +
    "                    <div class=\"md-list-item-text compact\" ng-click=\"addActivity($index)\">{{activ.activity}}\n" +
    "                </li>\n" +
    "            </ul>\n"
  );

  $templateCache.put("user/profile.html",
    "Profile de {{user.email}}\n"
  );

}]);
