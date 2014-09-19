---
layout: post
title:  "Using AngularJS Directives"
date:   2014-09-19 20:00:00
categories: angularjs
author: "Emrullah Lüleci"
---

> You can find the whole project on its [GitHub](https://github.com/eluleci/web-tutorial-project) repository and
final state of this post is saved in
[this branch](https://github.com/eluleci/web-tutorial-project/tree/4-using-angular-directive)
of the repository.

In this post we'll learn how to use directives in AngularJS. We'll create a directive for the movie rows that we printed
in the [previous post](/blog/angularjs/2014/09/17/getting-data-angular-http.html).
Let's skip the **bla bla** start coding.

<h4>What is directive in AngularJS?</h4>
In brief; directive is a custom DOM element that you define and create. You can bind scripts and style to directives.
The most important advantages of the directives are these:

* it simplifies the code
* helps you structure the code with smaller and re-usable parts
* lets you use same components in different places in web site
* makes it easy to refactor components


<h4>How to use directives?</h4>

We'll quickly demonstrate the usage of directives. In the
[previous post](/blog/angularjs/2014/09/17/getting-data-angular-http.html)
we had this code snippet in **index.html** for
printing the movie info.

{% highlight html %}
{% raw %}
<div ng-repeat="movie in movieList">
  <h1>{{movie.title}}</h1>
  <img ng-src="http://image.tmdb.org/t/p/w370/{{movie.poster_path}}"/>
</div>
{% endraw %}
{% endhighlight %}

In this example the movie items doesn't contain so much information so it seems simple but imagine how it would seem if
we printed everything in the movie object. It would start becoming more complicated with each data. So this is where the
**directives** comes. Instead of writing this many lines of code we simply want to have something like one of this;

{% highlight html %}
{% raw %}
<movie-info-box info="movie"></movie-info-box>  // as element

<div movie-info-box info="movie"></div>         // as attribute

<div class="movie-info-box" info="movie"></div> // as class
{% endraw %}
{% endhighlight %}


<h4>Creating a directive</h4>
So now we create a folder called **movie-info-box** under the **app/** folder. Then create a JavaScript file called
**movie-info-box.js** and put this code in it.

{% highlight javascript %}
tutorialProject.directive('movieInfoBox', function() {
  return {
    restrict: 'AEC',    // usage of the directive: A -> attribute, E -> element, C -> class (default: EC)
    scope: {
      movie: '=info'    // injects the 'movie' object that is given with the 'info' attribute
    },
    replace: true,      // replaces the directive DOM item with the template html (default: false)
    transclude: false,  // wraps the items inside the directive DOM (default: false)
    templateUrl: 'app/features/movie-info-box/movie-info-box.html'
  };
});
{% endhighlight %}

What we did here is creating a directive called **movieInfoBox** with the module object that we already created in
**app.js** object. The short explanations of items in the returned object are:

* **restrict:** Defines the usage of the directive. As I showed in the html snippet above you can use a directive
 in one of these three ways. In this post we'll use our directive as element so I'll remove A and C from restrict.
* **scope:** This is the part we inject objects or functions to our directive's scope from outside. Objects are passed
 via attributes on the directive DOM.
* **replace:** Replaces the root DOM element of the directive. If false, keeps the DOM.
* **transclude:** Wraps the items inside the DOM element of the directive.
* **template:** HTML code to generate.
* **templateURL:** URL of the HTML template of the directive.

Also as you realised there are two fields for template HTML and of course you can not use them both. If the template is too
short it is better to use **template** only otherwise it is better to use **templateUrl**.

Now we create the template of our directive. Since that we already have the HTML code for printing the movie data we'll
use it. Create a file called **movie-info-box.html** inside **app/features/movie-info-box/** folder and put this HTML
inside it.

{% highlight html %}
{% raw %}
<div>
  <h1>{{movie.title}}</h1>
  <img ng-src="http://image.tmdb.org/t/p/w370/{{movie.poster_path}}"/>
</div>
{% endraw %}
{% endhighlight %}

At this point our directive is ready. Let's use it.

<h4>Using directive</h4>

Now open **index.html** file and;

* insert the **movie-info-box.js**
* remove the HTML element that has **ng-repeat** on it and put this line instead. So this part
{% highlight html %}
{% raw %}
<div ng-repeat="movie in movieList">
  <h1>{{movie.title}}</h1>
  <img ng-src="http://image.tmdb.org/t/p/w370/{{movie.poster_path}}"/>
</div>
{% endraw %}
{% endhighlight %}
will turn into this
{% highlight html %}
{% raw %}
<movie-info-box info="movie"></movie-info-box>
{% endraw %}
{% endhighlight %}

Now when you refresh the page you'll see the same list is printed but with less code in **index.html**. You can play on
the directive and see the result of changes.

Be careful to the  name definition inside the js file (**movieInfoBox**) and usage in the html (**movie-info-box**).
This is how the directive names and the attributes are used. For example if we had inserted attribute **info** as
**movieInfo** we had to use the attribute like **movie-info** on the DOM element.

> Note: While injecting objects to directives you can omit the part after the equal sign if the object and attribute
name are same. For example we could use **movie: '='** instead of **movie: '=info'** while creating the directive
but then the attribute name on the DOM must be identical with the object name like
```<movie-info-box movie="movie"></movie-info-box>```

This is quite enough for our needs for this example but I'll tell some other useful information about control of the
DOM and the data that is in the directive's scope.

<h4>Manipulating directive scope and DOM: Controller vs Link</h4>
If you want to have more control of the directive there are two functions you can use. Directives contain a **controller**
and **link** objects. The **controller** function is the same as AngularJS Controllers thath I told in
[the controller post](blog/angularjs/2014/09/15/using-angular-controller.html).

However **link** function is something different. With **link** function you can use the **scope** of the directive too
but it is especially used for manipulating the DOM element and it's attributes.

{% highlight javascript %}
tutorialProject.directive('movieInfoBox', function () {
  return {
    restrict: 'AEC',
    scope: {
      movie: '=info'
    },
    replace: true,
    templateUrl: 'app/features/movie-info-box/movie-info-box.html',
    controller: function ($scope) {

      console.log('controller scope:')
      console.log($scope)
    },
    link: function (scope, element, attributes) {

      console.log('link scope:')
      console.log(scope)
      console.log('element:')
      console.log(element)
      console.log('attrs:')
      console.log(attrs)
      console.log('--------------- end of link')

    }
  };
});
{% endhighlight %}

As you see in the example, link function takes **scope**, **element** and **attributes** while controller only takes
**$scope** in it. I printed the values in the console so you can check the given objects. The **scope** of the controller
and the link functions are same.

Another important difference between the controller and link is that the controller is called before rendering the DOM
but the link is called after the DOM is rendered. Which explains why it is better to handle DOM element inside the link.

Now I'll create a simple code that binds click events to the poster and title and also checks the title length and
changes the text size accordingly.

{% highlight javascript %}
tutorialProject.directive('movieInfoBox', function () {
  return {
    ...
    controller: function ($scope) {

      // event binding sample 1
      // this is bound to the title in directive's template html with ng-click
      $scope.onTitleClick = function() {
        alert('Yes. You did click the ' + $scope.movie.title + '\'s title.')
      }
    },
    link: function (scope, element, attrs) {

      // event binding sample 1
      // or you can create the function here and bind with ng-click too
      //$scope.onTitleClick = function() {
      //  alert('Yes. You did click the ' + $scope.movie.title + '\'s title.')
      //}

      if (scope.movie.title.length > 20)
        element.find('h1').css('font-size', '26px');
      else if (scope.movie.title.length > 10)
        element.find('h1').css('font-size', '30px');

      // event binding sample 2
      // binding click event to poster inside the link
      element.find('img').on('click', function () {
        alert('Why did you click to ' + scope.movie.title + '\'s poster man!!!')
      })
    }
  };
});
{% endhighlight %}

And I added **ngClick** to title for calling the function **onTitleClick** which is defined in the **scope**.
{% highlight html %}
{% raw %}
<h1 ng-click="onTitleClick()">{{movie.title}}</h1>
{% endraw %}
{% endhighlight %}

So there are a lot of different options to do something in directives. I can create a lot more example but these are
enough for understanding the logic of **controller** and **link**. So my suggestion is

* use controller when you only need to manipulate the data and the functions
* use link when you need to manipulate the DOM elements inside the directive
* use controller and link together to separate the logic of data and DOM manipulations to keep the code simpler
if there are a lot of things to do about both data and the DOM

So feel free to play with it. Break things and fix again. This is how you'll understand things better :)

{% highlight html %}
{% raw %}

{% endraw %}
{% endhighlight %}




{% highlight javascript %}

{% endhighlight %}




