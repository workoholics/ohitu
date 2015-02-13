'use strict';

/**
 * @ngdoc service
 * @name appOhituApp.menuprovider
 * @description
 * # appMap provider
 * Constant in the appOhituApp.
 */

angular.module('appOhituApp')
.service('appMap',  function menuData()
{
	return {
		'login':
		{
			'key':'login',
			'url':'views/login.html',
			'subviewActive':'start'
		},
		'start':
		{
			'subviewActive':'start'
		},
		'new':
		{
			'subviewActive':'new'
		},
		'enter':
		{
			'subviewActive':'enter'
		},
		'forgot':
		{
			'subviewActive':'forgot'
		},
		'emailSent':
		{
			'subviewActive':'emailSent'
		},
		'firstUseSlider':
		{
			'key':'firstUseSlider',
			'url':'views/firstUseSlider.html',
			'title':'', 
			'menu':false,
			'bar':false,
			'backButton': false,
			'backButtonSubView':'' 
		},
		'challenge':
		{
			'key':'challenge',
			'url':'views/challenge.html',
			'title':'Erronken zerrenda', 
			'menu':true,
			'bar':true,
			'backButton': false,
			'subviewActive':'challengeList'
		},
		'challengeList':
		{
			'subviewActive':'challengeList',
			'menu': true,
			'bar': true,
			'backButton': false
		},
		'challengeInner':
		{
			'subviewActive':'challengeInner',
			'menu': true,
			'bar': true,
			'backButton': true,
			'backButtonSubView':'challengeList'
		},
		'challengeInnerEnd':
		{
			'subviewActive':'challengeInnerEnd',
			'menu': true,
			'bar': true,
			'backButton': true,
			'backButtonSubView':'challengeList'
		},
		'challengeNew':
		{
			'key':'challengeNew',
			'title':'Erronka gehitu',
			'url':'views/challengeNew.html', 
			'menu':true,
			'bar':true,
			'backButton': false,
			'backButtonSubView':'',
			'subviewActive':'challengeNewTarget',
		},
		'challengeNewTarget':
		{
			'subviewActive':'challengeNewTarget',
			'menu': true,
			'bar': true,
			'backButton': false
		},
		'challengeNewPer':
		{
			'subviewActive':'challengeNewPer',
			'menu':true,
			'bar':true,
			'backButton': true,
			'backButtonSubView':'challengeNewTarget'
		},
		'challengeNewLength':
		{
			'subviewActive':'challengeNewLength',
			'menu':true,
			'bar':true,
			'backButton': true,
			'backButtonSubView':'challengeNewPer'
		},
		'challengeNewPromise':
		{
			'subviewActive':'challengeNewPromise', 
			'menu':true,
			'bar':true,
			'backButton': true,
			'backButtonSubView':'challengeNewLength'
		},
		'about':
		{
			'key':'about',
			'url':'views/about.html',
			'title':'Gure buruz',
			'bar':true,
			'menu':true,
		},
		'tips':
		{
			'key':'tips',
			'url':'views/tips.html',
			'title':'Gomendioak',
			'bar':true,
			'menu':true,
		},
		'profile':
		{
			'key':'profile',
			'url':'views/profile.html',
			'title':'Profila',
			'bar':true,
			'menu':true,
			'subviewActive':'profileData', 
		},
		'profileData':
		{
			'subviewActive':'profileData', 
			'menu':true,
			'bar':true,
			'backButton': false,
		},
		'changeEmail':
		{
			'subviewActive':'changeEmail', 
			'menu':false,
			'bar':true,
			'backButton': true,
			'backButtonSubView':'profileData'
		},
		'changePassword':
		{
			'subviewActive':'changePassword', 
			'menu':false,
			'bar':true,
			'backButton': true,
			'backButtonSubView':'profileData'
		}
		
	};
});