
/**
 * This is a generated class and is not intended for modification.  
 */
package valueObjects
{
import com.adobe.fiber.styles.IStyle;
import com.adobe.fiber.styles.Style;
import com.adobe.fiber.styles.StyleValidator;
import com.adobe.fiber.valueobjects.AbstractEntityMetadata;
import com.adobe.fiber.valueobjects.AvailablePropertyIterator;
import com.adobe.fiber.valueobjects.IPropertyIterator;
import mx.events.ValidationResultEvent;
import com.adobe.fiber.core.model_internal;
import com.adobe.fiber.valueobjects.IModelType;
import mx.events.PropertyChangeEvent;

use namespace model_internal;

[ExcludeClass]
internal class _ThunderForChartEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("idx", "xian", "ftime", "period", "phase");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("idx", "xian", "ftime", "period", "phase");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("idx", "xian", "ftime", "period", "phase");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("idx", "xian", "ftime", "period", "phase");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "ThunderForChart";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();

    
    model_internal var _xianIsValid:Boolean;
    model_internal var _xianValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _xianIsValidCacheInitialized:Boolean = false;
    model_internal var _xianValidationFailureMessages:Array;
    
    model_internal var _ftimeIsValid:Boolean;
    model_internal var _ftimeValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _ftimeIsValidCacheInitialized:Boolean = false;
    model_internal var _ftimeValidationFailureMessages:Array;
    
    model_internal var _periodIsValid:Boolean;
    model_internal var _periodValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _periodIsValidCacheInitialized:Boolean = false;
    model_internal var _periodValidationFailureMessages:Array;
    
    model_internal var _phaseIsValid:Boolean;
    model_internal var _phaseValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _phaseIsValidCacheInitialized:Boolean = false;
    model_internal var _phaseValidationFailureMessages:Array;

    model_internal var _instance:_Super_ThunderForChart;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _ThunderForChartEntityMetadata(value : _Super_ThunderForChart)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // depenents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["idx"] = new Array();
            model_internal::dependentsOnMap["xian"] = new Array();
            model_internal::dependentsOnMap["ftime"] = new Array();
            model_internal::dependentsOnMap["period"] = new Array();
            model_internal::dependentsOnMap["phase"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object()
        }

        model_internal::_instance = value;
        model_internal::_xianValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForXian);
        model_internal::_xianValidator.required = true;
        model_internal::_xianValidator.requiredFieldError = "xian is required";
        //model_internal::_xianValidator.source = model_internal::_instance;
        //model_internal::_xianValidator.property = "xian";
        model_internal::_ftimeValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForFtime);
        model_internal::_ftimeValidator.required = true;
        model_internal::_ftimeValidator.requiredFieldError = "ftime is required";
        //model_internal::_ftimeValidator.source = model_internal::_instance;
        //model_internal::_ftimeValidator.property = "ftime";
        model_internal::_periodValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForPeriod);
        model_internal::_periodValidator.required = true;
        model_internal::_periodValidator.requiredFieldError = "period is required";
        //model_internal::_periodValidator.source = model_internal::_instance;
        //model_internal::_periodValidator.property = "period";
        model_internal::_phaseValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForPhase);
        model_internal::_phaseValidator.required = true;
        model_internal::_phaseValidator.requiredFieldError = "phase is required";
        //model_internal::_phaseValidator.source = model_internal::_instance;
        //model_internal::_phaseValidator.property = "phase";
    }

    override public function getEntityName():String
    {
        return model_internal::entityName;
    }

    override public function getProperties():Array
    {
        return model_internal::allProperties;
    }

    override public function getAssociationProperties():Array
    {
        return model_internal::allAssociationProperties;
    }

    override public function getRequiredProperties():Array
    {
         return model_internal::allRequiredProperties;   
    }

    override public function getDataProperties():Array
    {
        return model_internal::dataProperties;
    }

    override public function getGuardedProperties():Array
    {
        return model_internal::guardedProperties;
    }

    override public function getUnguardedProperties():Array
    {
        return model_internal::allAlwaysAvailableProperties;
    }

    override public function getDependants(propertyName:String):Array
    {
       if (model_internal::dataProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a data property of entity ThunderForChart");  
            
       return model_internal::dependentsOnMap[propertyName] as Array;  
    }

    override public function getDependedOnServices():Array
    {
        return model_internal::dependedOnServices;
    }

    override public function getCollectionProperties():Array
    {
        return model_internal::collectionProperties;
    }

    override public function getCollectionBase(propertyName:String):String
    {
        if (model_internal::collectionProperties.indexOf(propertyName) == -1)
            throw new Error(propertyName + " is not a collection property of entity ThunderForChart");  

        return model_internal::collectionBaseMap[propertyName];
    }

    override public function getAvailableProperties():com.adobe.fiber.valueobjects.IPropertyIterator
    {
        return new com.adobe.fiber.valueobjects.AvailablePropertyIterator(this);
    }

    override public function getValue(propertyName:String):*
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " does not exist for entity ThunderForChart");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::dataProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a data property of entity ThunderForChart");
        }

        model_internal::_instance[propertyName] = value;
    }

    override public function getMappedByProperty(associationProperty:String):String
    {
        switch(associationProperty)
        {
            default:
            {
                return null;
            }
        }
    }

    override public function getPropertyLength(propertyName:String):int
    {
        switch(propertyName)
        {
            default:
            {
                return 0;
            }
        }
    }

    override public function isAvailable(propertyName:String):Boolean
    {
        if (model_internal::allProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " does not exist for entity ThunderForChart");
        }

        if (model_internal::allAlwaysAvailableProperties.indexOf(propertyName) != -1)
        {
            return true;
        }

        switch(propertyName)
        {
            default:
            {
                return true;
            }
        }
    }

    override public function getIdentityMap():Object
    {
        var returnMap:Object = new Object();

        return returnMap;
    }

    [Bindable(event="propertyChange")]
    override public function get invalidConstraints():Array
    {
        if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
        {
            return model_internal::_instance.model_internal::_invalidConstraints;
        }
        else
        {
            // recalculate isValid
            model_internal::_instance.model_internal::_isValid = model_internal::_instance.model_internal::calculateIsValid();
            return model_internal::_instance.model_internal::_invalidConstraints;        
        }
    }

    [Bindable(event="propertyChange")]
    override public function get validationFailureMessages():Array
    {
        if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
        {
            return model_internal::_instance.model_internal::_validationFailureMessages;
        }
        else
        {
            // recalculate isValid
            model_internal::_instance.model_internal::_isValid = model_internal::_instance.model_internal::calculateIsValid();
            return model_internal::_instance.model_internal::_validationFailureMessages;
        }
    }

    override public function getDependantInvalidConstraints(propertyName:String):Array
    {
        var dependants:Array = getDependants(propertyName);
        if (dependants.length == 0)
        {
            return emptyArray;
        }

        var currentlyInvalid:Array = invalidConstraints;
        if (currentlyInvalid.length == 0)
        {
            return emptyArray;
        }

        var filterFunc:Function = function(element:*, index:int, arr:Array):Boolean
        {
            return dependants.indexOf(element) > -1;
        }

        return currentlyInvalid.filter(filterFunc);
    }

    /**
     * isValid
     */
    [Bindable(event="propertyChange")] 
    public function get isValid() : Boolean
    {
        if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
        {
            return model_internal::_instance.model_internal::_isValid;
        }
        else
        {
            // recalculate isValid
            model_internal::_instance.model_internal::_isValid = model_internal::_instance.model_internal::calculateIsValid();
            return model_internal::_instance.model_internal::_isValid;
        }
    }

    [Bindable(event="propertyChange")]
    public function get isIdxAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isXianAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isFtimeAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isPeriodAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isPhaseAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnXian():void
    {
        if (model_internal::_xianIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfXian = null;
            model_internal::calculateXianIsValid();
        }
    }
    public function invalidateDependentOnFtime():void
    {
        if (model_internal::_ftimeIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfFtime = null;
            model_internal::calculateFtimeIsValid();
        }
    }
    public function invalidateDependentOnPeriod():void
    {
        if (model_internal::_periodIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfPeriod = null;
            model_internal::calculatePeriodIsValid();
        }
    }
    public function invalidateDependentOnPhase():void
    {
        if (model_internal::_phaseIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfPhase = null;
            model_internal::calculatePhaseIsValid();
        }
    }

    model_internal function fireChangeEvent(propertyName:String, oldValue:Object, newValue:Object):void
    {
        this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, propertyName, oldValue, newValue));
    }

    [Bindable(event="propertyChange")]   
    public function get idxStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    [Bindable(event="propertyChange")]   
    public function get xianStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get xianValidator() : StyleValidator
    {
        return model_internal::_xianValidator;
    }

    model_internal function set _xianIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_xianIsValid;         
        if (oldValue !== value)
        {
            model_internal::_xianIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "xianIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get xianIsValid():Boolean
    {
        if (!model_internal::_xianIsValidCacheInitialized)
        {
            model_internal::calculateXianIsValid();
        }

        return model_internal::_xianIsValid;
    }

    model_internal function calculateXianIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_xianValidator.validate(model_internal::_instance.xian)
        model_internal::_xianIsValid_der = (valRes.results == null);
        model_internal::_xianIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::xianValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::xianValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get xianValidationFailureMessages():Array
    {
        if (model_internal::_xianValidationFailureMessages == null)
            model_internal::calculateXianIsValid();

        return _xianValidationFailureMessages;
    }

    model_internal function set xianValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_xianValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_xianValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "xianValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get ftimeStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get ftimeValidator() : StyleValidator
    {
        return model_internal::_ftimeValidator;
    }

    model_internal function set _ftimeIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_ftimeIsValid;         
        if (oldValue !== value)
        {
            model_internal::_ftimeIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ftimeIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get ftimeIsValid():Boolean
    {
        if (!model_internal::_ftimeIsValidCacheInitialized)
        {
            model_internal::calculateFtimeIsValid();
        }

        return model_internal::_ftimeIsValid;
    }

    model_internal function calculateFtimeIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_ftimeValidator.validate(model_internal::_instance.ftime)
        model_internal::_ftimeIsValid_der = (valRes.results == null);
        model_internal::_ftimeIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::ftimeValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::ftimeValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get ftimeValidationFailureMessages():Array
    {
        if (model_internal::_ftimeValidationFailureMessages == null)
            model_internal::calculateFtimeIsValid();

        return _ftimeValidationFailureMessages;
    }

    model_internal function set ftimeValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_ftimeValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_ftimeValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ftimeValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get periodStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get periodValidator() : StyleValidator
    {
        return model_internal::_periodValidator;
    }

    model_internal function set _periodIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_periodIsValid;         
        if (oldValue !== value)
        {
            model_internal::_periodIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "periodIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get periodIsValid():Boolean
    {
        if (!model_internal::_periodIsValidCacheInitialized)
        {
            model_internal::calculatePeriodIsValid();
        }

        return model_internal::_periodIsValid;
    }

    model_internal function calculatePeriodIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_periodValidator.validate(model_internal::_instance.period)
        model_internal::_periodIsValid_der = (valRes.results == null);
        model_internal::_periodIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::periodValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::periodValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get periodValidationFailureMessages():Array
    {
        if (model_internal::_periodValidationFailureMessages == null)
            model_internal::calculatePeriodIsValid();

        return _periodValidationFailureMessages;
    }

    model_internal function set periodValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_periodValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_periodValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "periodValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get phaseStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get phaseValidator() : StyleValidator
    {
        return model_internal::_phaseValidator;
    }

    model_internal function set _phaseIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_phaseIsValid;         
        if (oldValue !== value)
        {
            model_internal::_phaseIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "phaseIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get phaseIsValid():Boolean
    {
        if (!model_internal::_phaseIsValidCacheInitialized)
        {
            model_internal::calculatePhaseIsValid();
        }

        return model_internal::_phaseIsValid;
    }

    model_internal function calculatePhaseIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_phaseValidator.validate(model_internal::_instance.phase)
        model_internal::_phaseIsValid_der = (valRes.results == null);
        model_internal::_phaseIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::phaseValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::phaseValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get phaseValidationFailureMessages():Array
    {
        if (model_internal::_phaseValidationFailureMessages == null)
            model_internal::calculatePhaseIsValid();

        return _phaseValidationFailureMessages;
    }

    model_internal function set phaseValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_phaseValidationFailureMessages;

        var needUpdate : Boolean = false;
        if (oldValue == null)
            needUpdate = true;
    
        // avoid firing the event when old and new value are different empty arrays
        if (!needUpdate && (oldValue !== value && (oldValue.length > 0 || value.length > 0)))
        {
            if (oldValue.length == value.length)
            {
                for (var a:int=0; a < oldValue.length; a++)
                {
                    if (oldValue[a] !== value[a])
                    {
                        needUpdate = true;
                        break;
                    }
                }
            }
            else
            {
                needUpdate = true;
            }
        }

        if (needUpdate)
        {
            model_internal::_phaseValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "phaseValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }


     /**
     * 
     * @inheritDoc 
     */ 
     override public function getStyle(propertyName:String):com.adobe.fiber.styles.IStyle
     {
         switch(propertyName)
         {
            default:
            {
                return null;
            }
         }
     }
     
     /**
     * 
     * @inheritDoc 
     *  
     */  
     override public function getPropertyValidationFailureMessages(propertyName:String):Array
     {
         switch(propertyName)
         {
            case("xian"):
            {
                return xianValidationFailureMessages;
            }
            case("ftime"):
            {
                return ftimeValidationFailureMessages;
            }
            case("period"):
            {
                return periodValidationFailureMessages;
            }
            case("phase"):
            {
                return phaseValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
