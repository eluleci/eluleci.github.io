---
layout: post
title:  "Using AngularJS Controllers"
date:   2014-09-14 21:27:00
categories: angularjs
author: "Emrullah Lüleci"
---

> You can find the whole project on its [GitHub](https://github.com/eluleci/web-tutorial-project) repository and
final state of this post is saved in
[this branch](https://github.com/eluleci/web-tutorial-project/tree/2-using-angular-controller)
of the repository.

In this post we'll create an Angular controller. But before starting creating the files I want to mention to the
folder structure of the project.

<h4>Folder Structure</h4>
{% highlight json %}
root/
  app/
    features/
    app.js
  bower_components/...
  bower.json
  index.html
{% endhighlight %}

**root/:** Contains the configuration files and index.html.<br/>
**root/app/:** Contains main js and style files of the project.<br/>
**root/app/features:**  Contains files of Angular controllers and directives with their js, css and html-templates.<br/>
**root/bower_components:**  Contains the libraries (packages) downloaded by bower.<br/>

<h4>Creating Angular Module</h4>
First create a JavaScript file called **app.js** in app folder. Into the file add this code and save it.

{% highlight javascript %}
// defining the app module of the project
var tutorialProject = angular.module('tutorialApp', [])
{% endhighlight %}

This one line of code initialises the Angular Module of our app. Now create the
**index.html** file and insert **angular.js** (which we downloaded with bower in
[previous post](/angularjs/2014/09/14/installing-bower.html))
and **app.js** to it. Then add this `ng-app="tutorialApp"`
attribute to **html** node. Adding this attribute initialises the Angular Module that we created inside the **app.js**.
At this point your **index.html** should look like this.

{% highlight html %}
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html ng-app="tutorialApp">
<head lang="en">
  <meta http-equiv="content-type" content="text/html;charset=utf-8"/>
  <title>Angular Tutorial Project</title>
</head>
<body>

  <script src="bower_components/angular/angular.min.js"></script>
  <script src="app/app.js"></script>
</body>
</html>
{% endhighlight %}

Try to open the page with any browser. You'll not see anything but also you shouldn't be seeing any errors.

<h4>Creating Angular Controller</h4>
Now we'll create the first Angular controller. Open the **app.js** file and append this code.

{% highlight javascript %}
// defining a root controller
tutorialProject.controller('RootController', ['$scope',
  function ($scope) {

    // defining local variable (not accessible from outside)
    var someVariable = "You cannot access me from html!"

    // defining variable in scope
    $scope.message = "Hello World!"

    // defining function in scope
    $scope.greet = function () {
      return "Welcome dude!"
    }

  }]
);
{% endhighlight %}

For creating a controller we call the **.controller()** function of the **tutorialProject** object which is our module
object. First parameter is the name of the controller and the second one is an array which contains the dependencies
for injection and also the controller function. There are some variables and functions defined in the controller. As you
see in the comments if you create a variable in the injected object you can reach it from any place that has this scope
object (like from html).

Now we need to insert **RootController** to **index.html** like we added the module. Add `ng-controller="RootController"`
attribute to `body` and add these lines inside body before inserting scripts.

{% highlight javascript %}
{% raw %}
<!-- using scope variable -->
{{message}}

<!-- using scope function -->
{{greet()}}
{% endraw %}
{% endhighlight %}

Now refresh the **index.html** from the browser. You should see both of the messages. If you want to render the messages
better you can use html tags around them. Final look of the **index.html** should be like this.

{% highlight html %}
{% raw %}
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html ng-app="tutorialApp">
<head lang="en">
  <meta http-equiv="content-type" content="text/html;charset=utf-8"/>
  <title>Angular Tutorial Project</title>
</head>
<body ng-controller="RootController">

  <!-- using scope variable -->
  <h1>{{message}}</h1>

  <!-- using scope function -->
  <h3>{{greet()}}</h3>

  <script src="bower_components/angular/angular.min.js"></script>
  <script src="app/app.js"></script>
</body>
</html>
{% endraw %}
{% endhighlight %}

That's it. In the next post we'll get data from an API and show them in **index.html**.