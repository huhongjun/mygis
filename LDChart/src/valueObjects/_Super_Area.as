/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - Area.as.
 */

package valueObjects
{
import com.adobe.fiber.services.IFiberManagingService;
import com.adobe.fiber.util.FiberUtils;
import com.adobe.fiber.valueobjects.IValueObject;
import flash.events.Event;
import flash.events.EventDispatcher;
import mx.binding.utils.ChangeWatcher;
import mx.events.PropertyChangeEvent;
import mx.validators.ValidationResult;

import flash.net.registerClassAlias;
import flash.net.getClassByAlias;
import com.adobe.fiber.core.model_internal;
import com.adobe.fiber.valueobjects.IPropertyIterator;
import com.adobe.fiber.valueobjects.AvailablePropertyIterator;

use namespace model_internal;

[ExcludeClass]
public class _Super_Area extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _AreaEntityMetadata;

    /**
     * properties
     */
    private var _internal_idx : int;
    private var _internal_aid : String;
    private var _internal_aname : String;
    private var _internal_acolor : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_Area()
    {
        _model = new _AreaEntityMetadata(this);

        // Bind to own data properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "aid", model_internal::setterListenerAid));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "aname", model_internal::setterListenerAname));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "acolor", model_internal::setterListenerAcolor));

    }

    /**
     * data property getters
     */

    [Bindable(event="propertyChange")]
    public function get idx() : int
    {
        return _internal_idx;
    }

    [Bindable(event="propertyChange")]
    public function get aid() : String
    {
        return _internal_aid;
    }

    [Bindable(event="propertyChange")]
    public function get aname() : String
    {
        return _internal_aname;
    }

    [Bindable(event="propertyChange")]
    public function get acolor() : String
    {
        return _internal_acolor;
    }

    /**
     * data property setters
     */

    public function set idx(value:int) : void
    {
        var oldValue:int = _internal_idx;
        if (oldValue !== value)
        {
            _internal_idx = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "idx", oldValue, _internal_idx));
        }
    }

    public function set aid(value:String) : void
    {
        var oldValue:String = _internal_aid;
        if (oldValue !== value)
        {
            _internal_aid = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "aid", oldValue, _internal_aid));
        }
    }

    public function set aname(value:String) : void
    {
        var oldValue:String = _internal_aname;
        if (oldValue !== value)
        {
            _internal_aname = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "aname", oldValue, _internal_aname));
        }
    }

    public function set acolor(value:String) : void
    {
        var oldValue:String = _internal_acolor;
        if (oldValue !== value)
        {
            _internal_acolor = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "acolor", oldValue, _internal_acolor));
        }
    }

    /**
     * Data property setter listeners
     *
     * Each data property whose value affects other properties or the validity of the entity
     * needs to invalidate all previously calculated artifacts. These include:
     *  - any derived properties or constraints that reference the given data property.
     *  - any availability guards (variant expressions) that reference the given data property.
     *  - any style validations, message tokens or guards that reference the given data property.
     *  - the validity of the property (and the containing entity) if the given data property has a length restriction.
     *  - the validity of the property (and the containing entity) if the given data property is required.
     */

    model_internal function setterListenerAid(value:flash.events.Event):void
    {
        _model.invalidateDependentOnAid();
    }

    model_internal function setterListenerAname(value:flash.events.Event):void
    {
        _model.invalidateDependentOnAname();
    }

    model_internal function setterListenerAcolor(value:flash.events.Event):void
    {
        _model.invalidateDependentOnAcolor();
    }


    /**
     * valid related derived properties
     */
    model_internal var _isValid : Boolean;
    model_internal var _invalidConstraints:Array = new Array();
    model_internal var _validationFailureMessages:Array = new Array();

    /**
     * derived property calculators
     */

    /**
     * isValid calculator
     */
    model_internal function calculateIsValid():Boolean
    {
        var violatedConsts:Array = new Array();
        var validationFailureMessages:Array = new Array();

        var propertyValidity:Boolean = true;
        if (!_model.aidIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_aidValidationFailureMessages);
        }
        if (!_model.anameIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_anameValidationFailureMessages);
        }
        if (!_model.acolorIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_acolorValidationFailureMessages);
        }

        model_internal::_cacheInitialized_isValid = true;
        model_internal::invalidConstraints_der = violatedConsts;
        model_internal::validationFailureMessages_der = validationFailureMessages;
        return violatedConsts.length == 0 && propertyValidity;
    }

    /**
     * derived property setters
     */

    model_internal function set isValid_der(value:Boolean) : void
    {
        var oldValue:Boolean = model_internal::_isValid;
        if (oldValue !== value)
        {
            model_internal::_isValid = value;
            _model.model_internal::fireChangeEvent("isValid", oldValue, model_internal::_isValid);
        }
    }

    /**
     * derived property getters
     */

    [Transient]
    [Bindable(event="propertyChange")]
    public function get _model() : _AreaEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _AreaEntityMetadata) : void
    {
        var oldValue : _AreaEntityMetadata = model_internal::_dminternal_model;
        if (oldValue !== value)
        {
            model_internal::_dminternal_model = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "_model", oldValue, model_internal::_dminternal_model));
        }
    }

    /**
     * methods
     */


    /**
     *  services
     */
    private var _managingService:com.adobe.fiber.services.IFiberManagingService;

    public function set managingService(managingService:com.adobe.fiber.services.IFiberManagingService):void
    {
        _managingService = managingService;
    }

    model_internal function set invalidConstraints_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_invalidConstraints;
        // avoid firing the event when old and new value are different empty arrays
        if (oldValue !== value && (oldValue.length > 0 || value.length > 0))
        {
            model_internal::_invalidConstraints = value;
            _model.model_internal::fireChangeEvent("invalidConstraints", oldValue, model_internal::_invalidConstraints);
        }
    }

    model_internal function set validationFailureMessages_der(value:Array) : void
    {
        var oldValue:Array = model_internal::_validationFailureMessages;
        // avoid firing the event when old and new value are different empty arrays
        if (oldValue !== value && (oldValue.length > 0 || value.length > 0))
        {
            model_internal::_validationFailureMessages = value;
            _model.model_internal::fireChangeEvent("validationFailureMessages", oldValue, model_internal::_validationFailureMessages);
        }
    }

    model_internal var _doValidationCacheOfAid : Array = null;
    model_internal var _doValidationLastValOfAid : String;

    model_internal function _doValidationForAid(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfAid != null && model_internal::_doValidationLastValOfAid == value)
           return model_internal::_doValidationCacheOfAid ;

        _model.model_internal::_aidIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isAidAvailable && _internal_aid == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "aid is required"));
        }

        model_internal::_doValidationCacheOfAid = validationFailures;
        model_internal::_doValidationLastValOfAid = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfAname : Array = null;
    model_internal var _doValidationLastValOfAname : String;

    model_internal function _doValidationForAname(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfAname != null && model_internal::_doValidationLastValOfAname == value)
           return model_internal::_doValidationCacheOfAname ;

        _model.model_internal::_anameIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isAnameAvailable && _internal_aname == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "aname is required"));
        }

        model_internal::_doValidationCacheOfAname = validationFailures;
        model_internal::_doValidationLastValOfAname = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfAcolor : Array = null;
    model_internal var _doValidationLastValOfAcolor : String;

    model_internal function _doValidationForAcolor(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfAcolor != null && model_internal::_doValidationLastValOfAcolor == value)
           return model_internal::_doValidationCacheOfAcolor ;

        _model.model_internal::_acolorIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isAcolorAvailable && _internal_acolor == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "acolor is required"));
        }

        model_internal::_doValidationCacheOfAcolor = validationFailures;
        model_internal::_doValidationLastValOfAcolor = value;

        return validationFailures;
    }
    

}

}
