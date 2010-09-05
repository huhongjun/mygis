/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this value object you may modify the generated sub-class of this class - ThunderForChart.as.
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
public class _Super_ThunderForChart extends flash.events.EventDispatcher implements com.adobe.fiber.valueobjects.IValueObject
{
    model_internal static function initRemoteClassAliasSingle(cz:Class) : void
    {
    }

    model_internal static function initRemoteClassAliasAllRelated() : void
    {
    }

    model_internal var _dminternal_model : _ThunderForChartEntityMetadata;

    /**
     * properties
     */
    private var _internal_idx : int;
    private var _internal_xian : String;
    private var _internal_ftime : String;
    private var _internal_period : String;
    private var _internal_phase : String;

    private static var emptyArray:Array = new Array();


    /**
     * derived property cache initialization
     */
    model_internal var _cacheInitialized_isValid:Boolean = false;

    model_internal var _changeWatcherArray:Array = new Array();

    public function _Super_ThunderForChart()
    {
        _model = new _ThunderForChartEntityMetadata(this);

        // Bind to own data properties for cache invalidation triggering
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "xian", model_internal::setterListenerXian));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "ftime", model_internal::setterListenerFtime));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "period", model_internal::setterListenerPeriod));
        model_internal::_changeWatcherArray.push(mx.binding.utils.ChangeWatcher.watch(this, "phase", model_internal::setterListenerPhase));

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
    public function get xian() : String
    {
        return _internal_xian;
    }

    [Bindable(event="propertyChange")]
    public function get ftime() : String
    {
        return _internal_ftime;
    }

    [Bindable(event="propertyChange")]
    public function get period() : String
    {
        return _internal_period;
    }

    [Bindable(event="propertyChange")]
    public function get phase() : String
    {
        return _internal_phase;
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

    public function set xian(value:String) : void
    {
        var oldValue:String = _internal_xian;
        if (oldValue !== value)
        {
            _internal_xian = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "xian", oldValue, _internal_xian));
        }
    }

    public function set ftime(value:String) : void
    {
        var oldValue:String = _internal_ftime;
        if (oldValue !== value)
        {
            _internal_ftime = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "ftime", oldValue, _internal_ftime));
        }
    }

    public function set period(value:String) : void
    {
        var oldValue:String = _internal_period;
        if (oldValue !== value)
        {
            _internal_period = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "period", oldValue, _internal_period));
        }
    }

    public function set phase(value:String) : void
    {
        var oldValue:String = _internal_phase;
        if (oldValue !== value)
        {
            _internal_phase = value;
            this.dispatchEvent(mx.events.PropertyChangeEvent.createUpdateEvent(this, "phase", oldValue, _internal_phase));
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

    model_internal function setterListenerXian(value:flash.events.Event):void
    {
        _model.invalidateDependentOnXian();
    }

    model_internal function setterListenerFtime(value:flash.events.Event):void
    {
        _model.invalidateDependentOnFtime();
    }

    model_internal function setterListenerPeriod(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPeriod();
    }

    model_internal function setterListenerPhase(value:flash.events.Event):void
    {
        _model.invalidateDependentOnPhase();
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
        if (!_model.xianIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_xianValidationFailureMessages);
        }
        if (!_model.ftimeIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_ftimeValidationFailureMessages);
        }
        if (!_model.periodIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_periodValidationFailureMessages);
        }
        if (!_model.phaseIsValid)
        {
            propertyValidity = false;
            com.adobe.fiber.util.FiberUtils.arrayAdd(validationFailureMessages, _model.model_internal::_phaseValidationFailureMessages);
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
    public function get _model() : _ThunderForChartEntityMetadata
    {
        return model_internal::_dminternal_model;
    }

    public function set _model(value : _ThunderForChartEntityMetadata) : void
    {
        var oldValue : _ThunderForChartEntityMetadata = model_internal::_dminternal_model;
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

    model_internal var _doValidationCacheOfXian : Array = null;
    model_internal var _doValidationLastValOfXian : String;

    model_internal function _doValidationForXian(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfXian != null && model_internal::_doValidationLastValOfXian == value)
           return model_internal::_doValidationCacheOfXian ;

        _model.model_internal::_xianIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isXianAvailable && _internal_xian == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "xian is required"));
        }

        model_internal::_doValidationCacheOfXian = validationFailures;
        model_internal::_doValidationLastValOfXian = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfFtime : Array = null;
    model_internal var _doValidationLastValOfFtime : String;

    model_internal function _doValidationForFtime(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfFtime != null && model_internal::_doValidationLastValOfFtime == value)
           return model_internal::_doValidationCacheOfFtime ;

        _model.model_internal::_ftimeIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isFtimeAvailable && _internal_ftime == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "ftime is required"));
        }

        model_internal::_doValidationCacheOfFtime = validationFailures;
        model_internal::_doValidationLastValOfFtime = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPeriod : Array = null;
    model_internal var _doValidationLastValOfPeriod : String;

    model_internal function _doValidationForPeriod(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPeriod != null && model_internal::_doValidationLastValOfPeriod == value)
           return model_internal::_doValidationCacheOfPeriod ;

        _model.model_internal::_periodIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPeriodAvailable && _internal_period == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "period is required"));
        }

        model_internal::_doValidationCacheOfPeriod = validationFailures;
        model_internal::_doValidationLastValOfPeriod = value;

        return validationFailures;
    }
    
    model_internal var _doValidationCacheOfPhase : Array = null;
    model_internal var _doValidationLastValOfPhase : String;

    model_internal function _doValidationForPhase(valueIn:Object):Array
    {
        var value : String = valueIn as String;

        if (model_internal::_doValidationCacheOfPhase != null && model_internal::_doValidationLastValOfPhase == value)
           return model_internal::_doValidationCacheOfPhase ;

        _model.model_internal::_phaseIsValidCacheInitialized = true;
        var validationFailures:Array = new Array();
        var errorMessage:String;
        var failure:Boolean;

        var valRes:ValidationResult;
        if (_model.isPhaseAvailable && _internal_phase == null)
        {
            validationFailures.push(new ValidationResult(true, "", "", "phase is required"));
        }

        model_internal::_doValidationCacheOfPhase = validationFailures;
        model_internal::_doValidationLastValOfPhase = value;

        return validationFailures;
    }
    

}

}
