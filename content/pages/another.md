----
$title@: Home
path: /another/

$localization:
  path: /intl/{locale}/{base}
hero:
  title@: Hello World!
  subtitle@: Lorem ipsum dolor sit amet.
ctas:
  - title@: Callout 1
    subtitle@: Description 1.
  - title@: Callout 2
    subtitle@: Description 2.
  - title@: Callout 3
    subtitle@: Description 3.
----
<h1>{{_(doc.hero.title)}}</h1>
<p>{{_(doc.hero.subtitle)}}</p>

<div ng-controller="MainController as ctrl">
<form ng-submit="ctrl.sayHello(ctrl.text)">
  <input type="text" ng-model="ctrl.text">
  <button type="submit">{{_('Say Hello')}}</button>
</form>
</div>

<ul>
{% for cta in doc.ctas %}
<li><b>{{_(cta.title)}}:</b> {{_(cta.subtitle)}}
{% endfor %}
</ul>