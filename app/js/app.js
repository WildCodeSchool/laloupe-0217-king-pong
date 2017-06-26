
angular.module('app', ['md.time.picker', 'ui.router', 'ngMaterial', 'ngAria', 'ngAnimate', 'ngMessages', 'ksSwiper', 'checklist-model'])
    .config(['$compileProvider', compileProviderConfig]);

function compileProviderConfig($compileProvider) {
    $compileProvider.preAssignBindingsEnabled(true);
}

