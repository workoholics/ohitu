'use strict';

/**
 * @ngdoc service
 * @name appOhituApp.menuprovider
 * @description
 * # Menu provider
 * Constant in the appOhituApp.
 */

angular.module('appOhituApp')
.service('menuData',  function menuData()
{
	return {
		'items':
		[
			{
				'name':'Erronken zerrenda',
				'active':'active',
				'key':'challengeList',
				'url':'views/challengeList.html'
			},
			{
				'name':'Erronka gehitu',
				'active':'',
				'key':'challengeNew',
				'url':'views/challengeNew.html'
			},
			{
				'name':'Profila',
				'active':'',
			},
			{
				'name':'Oharrak',
				'active':'',
			},
			{
				'name':'Gure buruz',
				'active':'',
			}
		]
	};
});