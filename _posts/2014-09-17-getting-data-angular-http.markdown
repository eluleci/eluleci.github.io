---
layout: post
title:  "Getting Data with AngularJS HTTP"
date:   2014-09-17 21:27:00
categories: angularjs
author: "Emrullah Lüleci"
---

> You can find the whole project on its [GitHub](https://github.com/eluleci/web-tutorial-project) repository and
final state of this post is saved in
[this branch](https://github.com/eluleci/web-tutorial-project/tree/3-getting-data-angular-http)
of the repository.

In this post we'll see how we can make http get calls with AngularJS. For making the tutorial more interesting I am
going to continue with [The Movie Database API](http://docs.themoviedb.apiary.io/). We'll use a lot more from this API
during the tutorial but today we'll only show a list of popular movies.

<h4>Creating a controller for getting Movie List</h4>

The first thing that I am going to do is creating a new controller. We'll follow the same steps as in the previous post.
Now create a folder called **popular-movie-list** inside the **app/feature/** folder. Then create a JavaScript file
with the same name **popular-movie-list.js**.

Inside the **popular-movie-list.js** create a controller called **PopularMovieListController** as we did in the
previous post. The only difference here is that we don't need to create an app module here because we already created
one. So now we can reference that module object directly and create the controller.

{% highlight javascript %}
// defining popular movie list controller
tutorialProject.controller('PopularMovieListController', ['$scope', '$http',
    function ($scope, $http) {

    }]
);
{% endhighlight %}

The only major difference in this controller is that we inject an AngularJS service called **$http**. This is the
service that we are going to use for getting [popular movies from Movie DB API](https://api.themoviedb.org/3/movie/popular?api_key=968cca12b1a8492036b1e1e05af57e3f).
Now we'll call the **$http** method inside this controller and we'll save the received data as the movie list.

{% highlight javascript %}

var popularMoviesEndpoint = "https://api.themoviedb.org/3/movie/popular?api_key=968cca12b1a8492036b1e1e05af57e3f";

$scope.movieList = [];

$http({method: 'GET', url: popularMoviesEndpoint}).
  success(function (data, status, headers, config) {

    if (status == 200) {
      $scope.movieList = data.results;
      console.log($scope.movieList)
    } else {
      console.error('Error happened while getting the movie list.')
    }

  }).
  error(function (data, status, headers, config) {
    console.error('Error happened while getting the movie list.')
  });
{% endhighlight %}

> As you see I don't use **$scope** for saving the **popularMoviesEndpoint** but I use is for **movieList**. The
reason is that I need the movie list in **index.html**  for printing and that's why I put list in **$scope**.

<h4>Printing the Movie List</h4>

Since that we can get the movie list now, we can print them in the page. Open the **index.html** file and;

 * insert the **popular-movie-list.js** into the **index.html** file
 * remove the things inside the **<body>** (that we added in previous post)
 * create a div in **<body>**
 * add **PopularMovieListController** to that div

and **<body>** should look like this:

{% highlight html %}
{% raw %}
<body ng-controller="RootController">

<div ng-controller="PopularMovieListController">
  // place to print the movie list
</div>

<script src="bower_components/angular/angular.min.js"></script>
<script src="app/app.js"></script>
<script src="app/features/popular-movie-list/popular-movie-list.js"></script>

</body>
{% endraw %}
{% endhighlight %}

If you refresh the page at this point you'll see (in browser console) that there is a network call. Also we print the
movie list to console so you can check the data format of movies.

Now we are going to print the movies into the page. We'll use ´ngRepeat´ directive for that. I didn't mention what is
directive in AngularJS yet but we'll simply use this directive here to print the list easily. ´ngRepeat´ instantiates a
template for each item in a collection. For printing our movie list, put this code snippet into the
**PopularMovieListController** div.

{% highlight html %}
{% raw %}
<div ng-repeat="movie in movieList">
  <h1>{{movie.title}}</h1>
  <img ng-src="http://image.tmdb.org/t/p/w370/{{movie.poster_path}}" />
</div>
{% endraw %}
{% endhighlight %}

What this code does is iterating through all items inside the **movieList** array and generating the div which holds the
**ng-repeat** attribute. The array object we use here is the array that we initialised inside the
**PopularMovieListController** and accessing from the html page is the reason of putting the **movieList** object into
**$scope**.

When you refresh the page you'll see an ugly list <small>(don't worry we'll stylise the whole website in next posts and it will
be awesome)</small> of movies which consists of the titles and the posters of the movies.
You can check the other information inside the movie objects and print some other data too.

<h4>Paginating the movie list</h4>
Until here you've learned the main idea of this post. But it is better to finish this post after adding pagination.
I'll quickly tell that how you can paginate the movie list.

We'll use a button at the end of the page to load the next page but there is a library called [ngInfiniteScroll](https://github.com/sroze/ngInfiniteScroll)
which helps you to detect when user reaches at the end of the page. I'll not use it to keep the post shorter but I
encourage you to check it and give a chance to it.

This is how the **popular-movie-list.js** seems after I make changes for pagination.

{% highlight javascript %}
// defining popular movie list controller
tutorialProject.controller('PopularMovieListController', ['$scope', '$http',
    function ($scope, $http) {

      var apiKey = '968cca12b1a8492036b1e1e05af57e3f';
      var popularMoviesEndpoint = "https://api.themoviedb.org/3/movie/popular";
      var page = 0;

      $scope.movieList = [];

      // creating a function for getting the movie list. we use this function when loading next page is needed
      $scope.getMovieList = function () {

        var url = popularMoviesEndpoint + '?page=' + ++page + '&api_key=' + apiKey; // generating the url

        $http({method: 'GET', url: url}).
          success(function (data, status, headers, config) {

            if (status == 200) {
              page = data.page;                                             // saving current page for pagination
              $scope.movieList.push.apply($scope.movieList, data.results)   // appending new movies to current list
            } else {
              console.error('Error happened while getting the movie list.')
            }

          }).
          error(function (data, status, headers, config) {
            console.error('Error happened while getting the movie list.')
          });
      }

      $scope.getMovieList();    // calling the function when script is loaded for the first time

    }]
);
{% endhighlight %}

The changes we made are:

* creating a **page** variable to keep the current page
* creating **getMovieList** method for getting movie list
* generating a new url for the next page movies inside the **getMovieList** method
* saving the page number to **page** variable when data loaded
* adding the new set of movies to the existing movie list

Now we need to call **getMovieList** method from a button in the **index.html**. Add a button inside the
**PopularMovieListController** after the list and put the attribute **ng-click="getMovieList()"** on it. **ngClick** is
another AngularJS directive which works same as **onclick** of JavaScript but this can only be used for the methods in
the **$scope**.

{% highlight html %}
<button ng-click="getMovieList()">get more movies</button>
{% endhighlight %}

So in the beginning you will see an empty page only contains this button. When movie list is loaded the button will be
at the end of the page. When you click it the next page will be loaded. And that's it.

Finally I'll do some cosmetic, hiding the button when there is no movie yet and showing a "loading movies" message with
**ng-hide** and **ng-show** directives.

{% highlight html %}
<button ng-click="getMovieList()" ng-hide="movieList.length == 0">get more movies</button>
<p ng-show="movieList.length == 0">loading movies</p>
{% endhighlight %}

And that's it! Good luck.

> As I said in the beginning you can check the
[GitHub branch of this post](https://github.com/eluleci/web-tutorial-project/tree/3-getting-data-angular-http) for the
final state of the website at the end of this post.