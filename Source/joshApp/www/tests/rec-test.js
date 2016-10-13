describe('RecCtrl', function() {
	var scope;
	
	beforeEach(angular.mock.module('starter'));
	beforeEach(angular.mock.inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		$controller('RecCtrl', {$scope: scope});
	}));

	it("Checks the task creation", function () {
		var cat = localStorage.getItem('rec.category');
		expect(cat).not.BeNull();
	});
});