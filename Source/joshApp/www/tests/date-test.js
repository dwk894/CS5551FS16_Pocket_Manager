describe('RecCtrl', function() {
	var $controller;
	
	beforeEach(angular.mock.module('starter'));
	beforeEach(angular.mock.inject(function(_$controller_) {
		$controller = _$controller_;
		
	}));
	describe('recExpense', function() {
	it("Checks for invalid amount", function () {
        $scope = {};
         controller = $controller('RecCtrl', {$scope: scope});
		
        // Test basic jasmine to make sure it is working
		var a = null;
		expect(a).toBeNull();

		// Expense function  
		var func = $scope.recExpense(books, 3 , bookstore,null);
        var dateExpected = new Date(dateNow.setDate(dateNow.getDate()));

		// Amount check for a number in amount
		var date = localStorage.getItem('rec.date');
		expect(date).toEqual(dateExpected);

		
		});
	});
});