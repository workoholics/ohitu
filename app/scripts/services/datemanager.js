'use strict';

/**
 * @ngdoc service
 * @name appOhituApp.DateManager
 * @description
 * # DateManager
 * Factory in the appOhituApp.
 */
angular.module('appOhituApp')
  .factory('DateManager', function () {
    
    function DateManager(challenge){
      //Public properties
      this.startDate = moment(challenge.creationDate,'DD/MM/YYYY hh:mm:ss');
      this.startDateString = this.startDate.format('DD/MM/YYYY'); 
      this.startDayOfTheWeek = this.startDate.day();
      this.objetive = challenge.objetive;
      this.periodicity = challenge.periodicity;
      this.finishDate = this.calcFinishDate();
      this.finishDateString = this.calcFinishDate().format('DD/MM/YYYY');
      this.registry = challenge.registry;
      this.weeksAttempsLeft = this.attempsEnabled();
      this.totalAttemps = getTotalAttemps(this.startDate,this.finishDate,getWeekAttemps(this.periodicity));
      this.currentAttemps = this.registry.length;
      this.howMuchDone = this.howMuchDone();
      this.howMuchDoneExact = this.howMuchDoneExact();
      this.startDay = this.startDate.day();
      
    }

    /* Calcula la fecha final de un reto*/
    DateManager.prototype.calcFinishDate = function(){
      var finishDate = {};
      var datePointer = this.startDate.toDate();
      datePointer = moment(datePointer);
      if(this.objetive.indexOf('length_month_') !== -1){
        var months = parseInt(this.objetive.replace('length_month_',''));
        finishDate = datePointer.add(months,'month');
      }
      else if(this.objetive === 'length_week'){
        finishDate = datePointer.add(1,'week');
      }
      else if(this.objetive === 'length_year'){
        finishDate = datePointer.add(1,'year');
      }
      else if(this.objetive === '21'){
        finishDate = datePointer.add(21,'days');
      }
      return finishDate;
    };

    /* Calcula el porcentaje de repeticiones realizadas hasta la fecha*/
    DateManager.prototype.howMuchDone = function(){ 
      var howMuchDone = 0;
      var currentAtteps = this.registry.length;
      if(currentAtteps > 0){
        var days = getWeekAttemps(this.periodicity);
        var totalAttemps = getTotalAttemps(this.startDate,this.finishDate,days);
        howMuchDone = (currentAtteps * 100) / totalAttemps;
      }
      return Math.round(howMuchDone);
    };

     /* Calcula el porcentaje de repeticiones realizadas hasta la fecha*/
    DateManager.prototype.howMuchDoneExact = function(){ 
      var howMuchDone = 0;
      var currentAtteps = this.registry.length;
      if(currentAtteps > 0){
        var days = getWeekAttemps(this.periodicity);
        var totalAttemps = getTotalAttemps(this.startDate,this.finishDate,days);
        howMuchDone = (currentAtteps * 100) / totalAttemps;
      }
      return howMuchDone.toFixed(2);
    };


    /*Dias a la semana disponibles*/
    DateManager.prototype.attempsEnabled = function(){
      var weekStart;
      var weekFinish;
      var daysSubstract = 0;
      var weekCount = 0;
      var weekAttemps = getWeekAttemps(this.periodicity);

      if(moment().day() > this.startDate.day()){
        daysSubstract = moment().day() - this.startDate.day();
      }
      else if(moment().day() < this.startDate.day()){
        daysSubstract = Math.abs(this.startDate.day() - moment().day() - 7);
      }
      weekStart = moment().subtract(daysSubstract + 1,'days').endOf('day');
      weekFinish = moment().subtract(daysSubstract,'days').add(7,'days').startOf('day');

      for(var i = 0; i < this.registry.length; i++)
      {
        if(moment(this.registry[i].date,'DD/MM/YYYY hh:mm:ss').isBetween(weekStart,weekFinish)){
          weekCount++;
        }
      }
      return weekAttemps - weekCount;

    };

    DateManager.prototype.todayDone = function(){
      var done = false;
      for(var i = 0; i < this.registry.length; i++){
        if(moment(this.registry[i].date,'DD/MM/YYYY hh:mm:ss').isBetween(moment().subtract(1,'day').endOf('day'),moment().add(1,'day').startOf('day'))){
          done = true;
          break;
        }
      }
      return done;
    };


    /* Devuelve el numero total de intentos*/
    var getTotalAttemps = function(startDate,finishDate,days){
      var weeks = finishDate.diff(startDate,'weeks');
      return days * weeks;
    };

    /* Obtener el numero de repeticiones por semana*/
    var getWeekAttemps = function(periodicity){
      var attemps;
      if(periodicity === 'always'){
        attemps = 7;
      }
      else{
        attemps = parseInt(periodicity.replace('week_',''));
      }
      return attemps;
    };

    return DateManager;
  });
