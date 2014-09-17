---
layout: post
title:  "Installing Bower to Download AngularJS"
date:   2014-09-14 19:00:00
categories: angularjs
author: "Emrullah Lüleci"
---

> You can find the whole project on its [GitHub](https://github.com/eluleci/web-tutorial-project) repository and
final state of this post is saved in
[this branch](https://github.com/eluleci/web-tutorial-project/tree/1-initialising-bower)
of the repository.

Bower is used for managing dependencies and packages. Its logic is really simple. The dependency information
is kept in a json file and bower downloads them when needed. If you use bower you also don't need to keep
the packages in your projects' VCS repositories so they'll be more lightweight than ever.

<h4> Installing bower </h4>
For installing bower you should have [Node and npm](http://nodejs.org/) installed in your computer. Then you
just simply execute the command `npm install -g bower` to install bower.

<h4> Installing packages with bower </h4>
After bower is installed you are ready to install the packages with bower. There are several ways to install
packages such as;

* registered package in bowers system<br/>
`bower install angular`

* GitHub shorthand for url https://github.com/angular/angular.js<br/>
`bower install angular/angular.js`

* Git endpoint for angular<br/>
`bower install git@github.com:angular/angular.js.git`

* URL<br/>
`bower install http://example.com/script.js`

But we are not going to use none of these to download angularjs. We'll create a **bower.json** file and continue
with it.

<h4> Creating bower.json file </h4>
Now navigate to your project's root folder and run the command `bower init`. You'll be asked some questions.
Don't worry while answering them because the only thing that this command does is creating a **bower.json**
file with the answers of yours.

After the **bower.json** file is created open it. It should look like this. I removed some unnecessary parts
from my **bower.json** file and added angularjs to dependencies.

Dependencies contain two information of the package; name and version. When you want to add a package to bower
you can search packages from [bower's search page](http://bower.io/search/?q=angular) and find their information.

{% highlight json %}
{
  "name": "tutorial-project-web",
  "version": "0.0.0",
  "authors": [
    "eluleci <emrullahluleci@gmail.com>"
  ],
  "dependencies": {
    "angular": "1.2.3"
  },
  "license": "MIT",
  "homepage": "index.html"
}
{% endhighlight %}

<h4>Downloading AngularJS package</h4>
Since that AngularJS is declared as a dependency in **bower.json** file we can simply run the command
`bower install` to download AngularJS package. After the download finishes you'll see that there'll be a
**'bower_components'** folder created in the root folder. So when we want to use AngularJS in our project
we'll add the AngularJS file path (bower_components/angular/angular.min.js) to our index.html.

That's it.

In the next post we'll initialise the AngularJS in our project.