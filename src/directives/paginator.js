module.directive( 'paginator', function () {
    return {
        replace: true,
        restrict: 'E',
        scope: {
            count: '=',
            itemPerPage: '=',
            page: '=',
            pageChangeHandler: '&'
        },
        controller: function ( $scope ) {
            var pageLimit = 5;

            var goToPage = function ( page ) {

                if ( page > 0 && page <= $scope.pageCount && page != $scope.page ) {

                    $scope.page = page;
                    $scope.pageChangeHandler( {
                        pageNumber: page
                    } );
                    $scope.pages = createPages( $scope.pageCount, pageLimit );

                }
            }

            var createPages = function ( pageCount, pageLimit ) {

                var page = $scope.page;
                var pages = [];
                var nr = Math.floor( pageLimit / 2 );
                var start = 1;
                if ( pageCount > pageLimit ) {
                    start = page;

                    while ( start > 1 && ( page - start ) < nr ) {
                        start--;
                    }
                }


                for ( var i = start; i < start + pageLimit; i++ ) {
                    var page = {
                        index: i,
                        active: false
                    };
                    pages.push( page );

                    if ( i == $scope.pageCount ) break;
                }

                return pages;
            }

            $scope.$watch( 'count', function ( newval ) {
                if ( newval ) {
                    var pageCount = Math.ceil( newval / $scope.itemPerPage );

                    $scope.pageCount = pageCount;
                    $scope.pages = createPages( pageCount, pageLimit );
                }
            } );


            $scope.previous = function () {

                goToPage( $scope.page - 1 );

            }

            $scope.next = function () {

                goToPage( $scope.page + 1 );

            }

            $scope.goTo = function ( page ) {
                return goToPage( page );
            }

            $scope.pageIsActive = function ( index ) {
                if ( index == $scope.page ) {
                    return true;
                } else {
                    return false;
                }
            }

            $scope.pages = createPages();


        },
        template: '<div class="row">\
            <ul class="pagination" ng-show="pages.length > 1 ">\
                          <li ng-click="previous()"><a href="">قبلی</a></li>\
                          <li ng-repeat="page in pages" ng-click="goTo(page.index)" ng-class="{active : pageIsActive(page.index)}"><a href="">{{page.index}}</a></li>\
                          <li ng-click="next()"><a href="">بعدی</a></li>\
                        </ul>\
                        <p>نمایش {{((page - 1) * itemPerPage) + 1}} تا {{( page * itemPerPage)}} از {{count}} نتیجه موجود</p>\
            </div>\
                        '

    }
} );
