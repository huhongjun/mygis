
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
internal class _AreaEntityMetadata extends com.adobe.fiber.valueobjects.AbstractEntityMetadata
{
    private static var emptyArray:Array = new Array();

    model_internal static var allProperties:Array = new Array("idx", "aid", "aname", "acolor");
    model_internal static var allAssociationProperties:Array = new Array();
    model_internal static var allRequiredProperties:Array = new Array("idx", "aid", "aname", "acolor");
    model_internal static var allAlwaysAvailableProperties:Array = new Array("idx", "aid", "aname", "acolor");
    model_internal static var guardedProperties:Array = new Array();
    model_internal static var dataProperties:Array = new Array("idx", "aid", "aname", "acolor");
    model_internal static var derivedProperties:Array = new Array();
    model_internal static var collectionProperties:Array = new Array();
    model_internal static var collectionBaseMap:Object;
    model_internal static var entityName:String = "Area";
    model_internal static var dependentsOnMap:Object;
    model_internal static var dependedOnServices:Array = new Array();

    
    model_internal var _aidIsValid:Boolean;
    model_internal var _aidValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _aidIsValidCacheInitialized:Boolean = false;
    model_internal var _aidValidationFailureMessages:Array;
    
    model_internal var _anameIsValid:Boolean;
    model_internal var _anameValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _anameIsValidCacheInitialized:Boolean = false;
    model_internal var _anameValidationFailureMessages:Array;
    
    model_internal var _acolorIsValid:Boolean;
    model_internal var _acolorValidator:com.adobe.fiber.styles.StyleValidator;
    model_internal var _acolorIsValidCacheInitialized:Boolean = false;
    model_internal var _acolorValidationFailureMessages:Array;

    model_internal var _instance:_Super_Area;
    model_internal static var _nullStyle:com.adobe.fiber.styles.Style = new com.adobe.fiber.styles.Style();

    public function _AreaEntityMetadata(value : _Super_Area)
    {
        // initialize property maps
        if (model_internal::dependentsOnMap == null)
        {
            // depenents map
            model_internal::dependentsOnMap = new Object();
            model_internal::dependentsOnMap["idx"] = new Array();
            model_internal::dependentsOnMap["aid"] = new Array();
            model_internal::dependentsOnMap["aname"] = new Array();
            model_internal::dependentsOnMap["acolor"] = new Array();

            // collection base map
            model_internal::collectionBaseMap = new Object()
        }

        model_internal::_instance = value;
        model_internal::_aidValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForAid);
        model_internal::_aidValidator.required = true;
        model_internal::_aidValidator.requiredFieldError = "aid is required";
        //model_internal::_aidValidator.source = model_internal::_instance;
        //model_internal::_aidValidator.property = "aid";
        model_internal::_anameValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForAname);
        model_internal::_anameValidator.required = true;
        model_internal::_anameValidator.requiredFieldError = "aname is required";
        //model_internal::_anameValidator.source = model_internal::_instance;
        //model_internal::_anameValidator.property = "aname";
        model_internal::_acolorValidator = new StyleValidator(model_internal::_instance.model_internal::_doValidationForAcolor);
        model_internal::_acolorValidator.required = true;
        model_internal::_acolorValidator.requiredFieldError = "acolor is required";
        //model_internal::_acolorValidator.source = model_internal::_instance;
        //model_internal::_acolorValidator.property = "acolor";
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
            throw new Error(propertyName + " is not a data property of entity Area");  
            
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
            throw new Error(propertyName + " is not a collection property of entity Area");  

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
            throw new Error(propertyName + " does not exist for entity Area");
        }

        return model_internal::_instance[propertyName];
    }

    override public function setValue(propertyName:String, value:*):void
    {
        if (model_internal::dataProperties.indexOf(propertyName) == -1)
        {
            throw new Error(propertyName + " is not a data property of entity Area");
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
            throw new Error(propertyName + " does not exist for entity Area");
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
    public function get isAidAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isAnameAvailable():Boolean
    {
        return true;
    }

    [Bindable(event="propertyChange")]
    public function get isAcolorAvailable():Boolean
    {
        return true;
    }


    /**
     * derived property recalculation
     */
    public function invalidateDependentOnAid():void
    {
        if (model_internal::_aidIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfAid = null;
            model_internal::calculateAidIsValid();
        }
    }
    public function invalidateDependentOnAname():void
    {
        if (model_internal::_anameIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfAname = null;
            model_internal::calculateAnameIsValid();
        }
    }
    public function invalidateDependentOnAcolor():void
    {
        if (model_internal::_acolorIsValidCacheInitialized )
        {
            model_internal::_instance.model_internal::_doValidationCacheOfAcolor = null;
            model_internal::calculateAcolorIsValid();
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
    public function get aidStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get aidValidator() : StyleValidator
    {
        return model_internal::_aidValidator;
    }

    model_internal function set _aidIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_aidIsValid;         
        if (oldValue !== value)
        {
            model_internal::_aidIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "aidIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get aidIsValid():Boolean
    {
        if (!model_internal::_aidIsValidCacheInitialized)
        {
            model_internal::calculateAidIsValid();
        }

        return model_internal::_aidIsValid;
    }

    model_internal function calculateAidIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_aidValidator.validate(model_internal::_instance.aid)
        model_internal::_aidIsValid_der = (valRes.results == null);
        model_internal::_aidIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::aidValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::aidValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get aidValidationFailureMessages():Array
    {
        if (model_internal::_aidValidationFailureMessages == null)
            model_internal::calculateAidIsValid();

        return _aidValidationFailureMessages;
    }

    model_internal function set aidValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_aidValidationFailureMessages;

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
            model_internal::_aidValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "aidValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get anameStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get anameValidator() : StyleValidator
    {
        return model_internal::_anameValidator;
    }

    model_internal function set _anameIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_anameIsValid;         
        if (oldValue !== value)
        {
            model_internal::_anameIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "anameIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get anameIsValid():Boolean
    {
        if (!model_internal::_anameIsValidCacheInitialized)
        {
            model_internal::calculateAnameIsValid();
        }

        return model_internal::_anameIsValid;
    }

    model_internal function calculateAnameIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_anameValidator.validate(model_internal::_instance.aname)
        model_internal::_anameIsValid_der = (valRes.results == null);
        model_internal::_anameIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::anameValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::anameValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get anameValidationFailureMessages():Array
    {
        if (model_internal::_anameValidationFailureMessages == null)
            model_internal::calculateAnameIsValid();

        return _anameValidationFailureMessages;
    }

    model_internal function set anameValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_anameValidationFailureMessages;

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
            model_internal::_anameValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "anameValidationFailureMessages", oldValue, value));
            // Only execute calculateIsValid if it has been called before, to update the validationFailureMessages for
            // the entire entity.
            if (model_internal::_instance.model_internal::_cacheInitialized_isValid)
            {
                model_internal::_instance.model_internal::isValid_der = model_internal::_instance.model_internal::calculateIsValid();
            }
        }
    }

    [Bindable(event="propertyChange")]   
    public function get acolorStyle():com.adobe.fiber.styles.Style
    {
        return model_internal::_nullStyle;
    }

    public function get acolorValidator() : StyleValidator
    {
        return model_internal::_acolorValidator;
    }

    model_internal function set _acolorIsValid_der(value:Boolean):void 
    {
        var oldValue:Boolean = model_internal::_acolorIsValid;         
        if (oldValue !== value)
        {
            model_internal::_acolorIsValid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "acolorIsValid", oldValue, value));
        }                             
    }

    [Bindable(event="propertyChange")]
    public function get acolorIsValid():Boolean
    {
        if (!model_internal::_acolorIsValidCacheInitialized)
        {
            model_internal::calculateAcolorIsValid();
        }

        return model_internal::_acolorIsValid;
    }

    model_internal function calculateAcolorIsValid():void
    {
        var valRes:ValidationResultEvent = model_internal::_acolorValidator.validate(model_internal::_instance.acolor)
        model_internal::_acolorIsValid_der = (valRes.results == null);
        model_internal::_acolorIsValidCacheInitialized = true;
        if (valRes.results == null)
             model_internal::acolorValidationFailureMessages_der = emptyArray;
        else
        {
            var _valFailures:Array = new Array();
            for (var a:int = 0 ; a<valRes.results.length ; a++)
            {
                _valFailures.push(valRes.results[a].errorMessage);
            }
            model_internal::acolorValidationFailureMessages_der = _valFailures;
        }
    }

    [Bindable(event="propertyChange")]
    public function get acolorValidationFailureMessages():Array
    {
        if (model_internal::_acolorValidationFailureMessages == null)
            model_internal::calculateAcolorIsValid();

        return _acolorValidationFailureMessages;
    }

    model_internal function set acolorValidationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_acolorValidationFailureMessages;

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
            model_internal::_acolorValidationFailureMessages = value;   
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "acolorValidationFailureMessages", oldValue, value));
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
            case("aid"):
            {
                return aidValidationFailureMessages;
            }
            case("aname"):
            {
                return anameValidationFailureMessages;
            }
            case("acolor"):
            {
                return acolorValidationFailureMessages;
            }
            default:
            {
                return emptyArray;
            }
         }
     }

}

}
