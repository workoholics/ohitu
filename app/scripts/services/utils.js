'use strict';

angular.module('appOhituApp').service('Utils',function(restclient){

	var context = this;

	this.getContentManager = function (data){

		
		var contentManager = {
			key: data.key,
			url: data.url,
			title: data.title,
			menu: data.menu,
			bar: data.bar,
			backButton: data.backButton,
			backButtonSubView: data.backButtonSubView,
			subviewActive: data.subviewActive,
			show : function(data)
			{	
				this.key = data.key === undefined ? '' : data.key;
				this.url = data.url === undefined ? '' : data.url; 
				this.title = data.title === undefined ? '' :  data.title; 
				this.menu = data.menu === undefined ? '' : data.menu; 
				this.bar = data.bar === undefined ? '' : data.bar; 
				this.backButton = data.backButton === undefined ? '' : data.backButton; 
				this.backButtonSubView = data.backButtonSubView === undefined ? '' : data.backButtonSubView;
				this.subviewActive = data.subviewActive === undefined ? '' : data.subviewActive;
				this.mainMenu.close();
			},
			change : function(data)
			{
				this.title = data.title === undefined ? '' :  data.title; 
				this.menu = data.menu === undefined ? '' : data.menu; 
				this.bar = data.bar === undefined ? '' : data.bar;
				this.subviewActive = data.subviewActive === undefined ? '' : data.subviewActive; 
				this.backButton = data.backButton === undefined ? '' : data.backButton; 
				this.backButtonSubView = data.backButtonSubView === undefined ? '' : data.backButtonSubView;
			},
			mainMenu:
			{
				isOpen : false,
				menuClass : '',
				toggle: function(){
					if(this.isOpen)
					{
						this.close();
					}
					else
					{
						this.open();
					}
				},
				close: function(){
					this.menuClass = '';
					this.isOpen = false; 
				},
				open: function(){
					this.menuClass = 'opened';
					this.isOpen = true;
				}
			},
		};		
		return contentManager;
	};

	this.getFirstByName = function(array,name)
	{
		for(var i = 0; i < array.length; i++){
			if(array[i].name === name){
				return array[i];
			}
		}
	};

	this.getFirstById = function(array,id)
	{
		for(var i = 0; i < array.length; i++){
			if(array[i].id === id){
				return array[i];
			}
		}
	};

	this.getMenuManager = function()
	{
		var menuManager =
		{
			active: '',
			toggle: function()
			{
				this.active = this.active === '' ? 'active' : '';
			}
		}; 
		
		return menuManager;
	};

	this.getScreenData= function(screen){

		var screenData = {};
	  	restclient.screens.get({name:screen},
	    function(response){
	       screenData = response.content.collection[0];
	    });
	};

	this.getCookie = function(name) {
	  var value = '; ' + document.cookie;
	  var parts = value.split('; ' + name + '=');
	  if (parts.length === 2){ return parts.pop().split(';').shift();}
	};

	this.setCookie = function(cname, cvalue, exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = 'expires='+d.toUTCString();
	    document.cookie = cname + '=' + cvalue + '; ' + expires;
	};

	this.deleteCookie = function(cname) {
	    document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	};

	this.splitBreakRow = function(string){
		return string.split('|');
	};


	/* Calcula la fecha final de un reto*/
    this.calcFinishDate = function(startDate,objetive){
      var finishDate = {};
      var datePointer = moment(startDate,'DD/MM/YYYY hh:mm:ss').toDate();
      datePointer = moment(datePointer);
      if(objetive.indexOf('length_month_') !== -1){
        var months = parseInt(objetive.replace('length_month_',''));
        finishDate = datePointer.add(months,'month');
      }
      else if(objetive === 'length_week'){
        finishDate = datePointer.add(1,'week');
      }
      else if(objetive === 'length_year'){
        finishDate = datePointer.add(1,'year');
      }
      else if(objetive === '21'){
        finishDate = datePointer.add(21,'days');
      }
      return finishDate;
    };

    /*Guarda usuario y contraseña en Local Storage*/
    this.createSession = function(item){
    	localStorage.setItem('userId',item.id);
    	localStorage.setItem('token',item.token);
    };

    /* Borra el usuario y contraseña de Local Storage*/
    this.deleteSession = function(){
    	localStorage.removeItem('userId');
    	localStorage.removeItem('token');
    };

    /* Comprueba si existe una session activa*/
    this.sessionExist = function(){
    	var resultado = false;
    	if(localStorage.getItem('userId') !== null && localStorage.getItem('token') !== null)
    	{
    		resultado = true;
    	} 
    	return resultado;
    };


    this.relogin = function(funcSuccess,funcError){
    	restclient.relogin.save({userId: localStorage.getItem('userId'),token: localStorage.getItem('token')},
    	funcSuccess,
    	funcError);
 	};






});