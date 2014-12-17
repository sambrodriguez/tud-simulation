"use strict";
define([
    "lib/Utils"
  , "lib/Class"
  , "app/Creature"
  , "app/Body"
  , "app/Wall" ], function (Utils, Class, Creature, Body, Wall) {
  	var Generator=Class.extend({
      init: function(mRate){
        if ( typeof(mRate) === 'undefined' ) { mRate = 0; }
        this.mutationRate=mRate;
      }
    , GenerateRandData: function(num){
        var NData=[];
        for (var i=0; i<num; i++){
          var TData = {
            torsoData:  {
                initialX: 4
                , initialY: 10
                , initialAngle: 0
                , width: Utils.Math.randRange(2,5)
                , height: Utils.Math.randRange(.1,2)
                , density: Utils.Math.randRange(.8,1.2)
                , friction: 0.01
            }

            , leftWheelData: {
              radius: Utils.Math.randRange(.1,2)
              , density: 2
              , friction: 0.1
          }

          , leftWheelJointData: {
              enableMotor: true
              , motorSpeed: Utils.Math.randRange(1,20)
              , maxMotorTorque: Utils.Math.randRange(10,100)
          }

          , rightWheelData: {
              radius: Utils.Math.randRange(.1,2)
              , density: 2
              , friction: 0.1
          }

          , rightWheelJointData: {
              enableMotor: true
              , motorSpeed: Utils.Math.randRange(1,20)
              , maxMotorTorque: Utils.Math.randRange(10,100)
          }

          , tailData: {
              numVertebrae: Utils.Math.randRange(2,10)
              , rootWidth: Utils.Math.randRange(.1,1)
              , rootHeight: Utils.Math.randRange(.3,1.3)
              , rootDensity: Utils.Math.randRange(.5,1.5)
              , rootMaxTorque: Utils.Math.randRange(75000,750000)
              , widthReductionFactor: Utils.Math.randRange(.8,1.3)
              , heightReductionFactor: Utils.Math.randRange(.7,1.2)
              , densityReductionFactor: Utils.Math.randRange(.8,1.1)
              , torqueReductionFactor: Utils.Math.randRange(.9,1.3)
              , friction: 0.5
          }

          , tailNeuronData: {

          }
        };
        NData.push(Utils.Data.copyThing(TData));
      }
      return NData;
    }
  	,	Generate1: function(parentA, parentB){
  			var AData=parentA.props;
  			var BData=parentB.props;
  			var CData=Utils.Data.copyThing(AData);
  			for(var prop in BData) {
  				for(var key in BData[prop]) { // Important: AData and BData should have the same property types contained in them.
            if (Math.random() < 0.5) {
              CData[prop][key] = BData[prop][key];
            }
            if (Math.random()<this.mutationRate && typeof(CData[prop][key])==="number"){
              //console.log("mutation");
              CData[prop][key] = Utils.Math.randRange(AData[prop][key], BData[prop][key]);
            }
          }
        }
        return CData;
  		}
    , 




  	});
    return Generator;
  });

