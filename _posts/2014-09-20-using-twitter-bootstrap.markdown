---
layout: post
title:  "Using Twitter Bootstrap"
date:   2014-09-19 20:00:00
categories: angularjs
author: "Emrullah Lüleci"
---

> In this tutorial series each post adds new features to the **Web Tutorial Project** which has a
[GitHub repository](https://github.com/eluleci/web-tutorial-project) that you can find the latest code always.
Each post has its' own branch. So the final code of this post is saved in
[this branch](https://github.com/eluleci/web-tutorial-project/tree/5-using-bootstrap)
of the repository. Also you can
[download this post's files from here](https://github.com/eluleci/web-tutorial-project/tree/5-using-bootstrap.zip).

In this post we'll import [Twitter Bootstrap](http://getbootstrap.com/) to our website. We'll only use
[its grid system](http://getbootstrap.com/css/#grid) today but we'll use its other components later on.

<h4>What is Bootstrap?</h4>
Bootstrap is a framework that contains CSS, HTML, JS components for building good looking and responsive user interfaces
without writing tons of code. It contains grid system, form elements, navigation, tables etc. Since that everything is
defined and well designed we'll use benefit from it in our website.

<h4>Dowloading Bootstrap with Bower</h4>
In the [first post of this tutorial](/blog/angularjs/2014/09/14/installing-bower.html) we've installed Bower and
downloaded AngularJS with it. We'll do the same for downloading **Bootstrap**. If you don't use Bower you can download
Bootstrap from [its web site](http://getbootstrap.com/).

Now open the **bower.json** file and add **bootstrap** version **3.2.0**. It will look like this.

{% highlight json %}
{
  "name": "tutorial-project-web",
  "version": "0.0.0",
  "authors": [
    "eluleci <emrullahluleci@gmail.com>"
  ],
  "dependencies": {
    "angular": "1.2.3",
    "bootstrap": "3.2.0"
  },
  "license": "MIT",
  "homepage": "index.html"
}

{% endhighlight %}

Then run the command **bower install** from the command line in the folder that has the **bower.json** and you'll see
that the **bootstrap** folder created inside the **bower_components** folder. Add the reference of the
**bootstrap.min.css** to **index.html** inside the header.

{% highlight html %}
<link rel="stylesheet" href="/bower_components/bootstrap/dist/css/bootstrap.min.css" />
{% endhighlight %}

<h4>Using Bootstrap</h4>
When you refresh the page you'll see that there are already some changes in the title of the movies. Even though you
don't add any CSS class to any element, bootstrap has default styles for body, fonts, titles, tables, lists etc.

We'll use the grid system of Bootstrap now. You can look all the components in it and experiment them. For
designing the web site we'll use [less](http://lesscss.org/) later on, so this post will be only about using basics of
bootstrap.

* First of all, add a div that wraps the **PopularMovieListController** in **index.html** and add the class
**'container'** to that div. What **'container'** class does is changing the content width according to the window size
and centering the page content in the browser window.
* Then add class **'row'** to the **PopularMovieListController**
element. Row class is a holder for horizontally placed items.
* Bootstrap is based on a system with **12** grids. The grids we'll put inside the **row** are separated via margins,
so **row** has negative margins at left and right to keep the content wide enough. So our **index.html** becomes like this.

{% highlight html %}
{% raw %}
<body ng-controller="RootController">

<div class="container">

  <div ng-controller="PopularMovieListController" class="row">

    <movie-info-box ng-repeat="movie in movieList" info="movie"></movie-info-box>

    <button ng-click="getMovieList()" ng-hide="movieList.length == 0">get more movies</button>
    <p ng-show="movieList.length == 0">loading movies</p>

  </div>
</div>

<!-- js files ... -->
</body>
{% endraw %}
{% endhighlight %}


Now open the **movie-info-box.html** and apply these changes.

{% highlight html %}
{% raw %}
<div class="movie-info-box col-sm-6">
  <h2 ng-click="onTitleClick()">{{movie.title}}</h2>

  <div class="row">
    <h5 class="col-sm-9">{{movie.original_title}}</h5>
    <p class="release-date col-sm-3">{{movie.release_date}}</p>
  </div>
  <img class="poster" ng-src="http://image.tmdb.org/t/p/w370/{{movie.poster_path}}"/>
</div>
{% endraw %}
{% endhighlight %}

What I did here is adding some additional info to info box and adding new classes to the items for demonstrating the
grid system better.

* The class **'col-sm-12'** means that this item will occupy all 12 columns inside that area. Title was already occupying
that area but I just wanted to mention it.
* The row under the title contains two items in it. One of them has the class **'col-sm-9'** on it. It means that this
item will occupy the 9 grids (9/12) and the other item will occupy 3 grids (3/12) of the row.

> For showing richer content I added this parameter **'&language=tr'** at the end of the request for getting
the movie list. It returns the movies with Turkish titles and I additionally show the original title beneath it.

I also added some CSS classes to the items. This is the CSS file that I added **/app/features/movie-info-box/movie-box-info.css**.
Don't forget to add it to **index.html**.

{% highlight css %}
.movie-info-box {
  height: 650px;
  margin-bottom: 20px;
}

.movie-info-box .release-date {
  text-align: right;
  margin-top: 10px;
  font-size: 10px;
}

.movie-info-box img.poster {
  max-width: 100%;
}
{% endhighlight %}

> WARNING: When we created the **movie-info-box** directive we set the **restrict** value to **'AEC'** which means that
this directive can be created as **A**ttribute, **E**lement or **C**lass. Also here, inside the directive itself, we use
the same class for styling. So it will create an **endless loop** because when directive tries to render the class
**movie-info-box** it will again try to create another directive. So remove the **C** character
from the **restrict** value inside the directive.

Now if you refresh the page you'll see that there are two movies in each row and the rows are centered. I especially set
the height of the **movie-info-box** to 650px to make all of them same height. Otherwise the rows wouldn't be ordered. I
also set the **max-width** of the posters to 100% because I don't want them to overflow.

This is the most basic info about the grid system. I'll mention some other stuff about grids now.

<h4>More info about Bootstrap grid system</h4>

* As we used **'col-sm-...'** class for the **small** screen size, you can use the other classes to change the layout
when the window size changes. The numbers at the end can be anything between 1 and 12. All sizes are:
  * **'col-xs-...'** for **xsmall**,
  * **'col-sm-...'** for **small**,
  * **'col-md-...'** for **medium**,
  * **'col-lg-...'** for **large** screens.
* You can also give some offset to the columns with the classes: **col-xs-offset-...**, **col-sm-offset-...**,
**col-md-offset-...**, **col-lg-offset-...**
* Sum of the grids should complete **12** grids to use the whole space effectively.
* The columns should be used in a **row** class to respect to the layout flow.

And that's it. I hope you'll find the Bootstrap and its grid system useful.

Cheers!

{% highlight html %}
{% raw %}

{% endraw %}
{% endhighlight %}


{% highlight javascript %}

{% endhighlight %}




