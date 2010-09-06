/**
 * This is a generated class and is not intended for modification.  To customize behavior
 * of this service wrapper you may modify the generated sub-class of this class - AreaService.as.
 */
package services.areaservice
{
import com.adobe.fiber.core.model_internal;
import com.adobe.fiber.services.wrapper.RemoteObjectServiceWrapper;
import com.adobe.serializers.utility.TypeUtility;
import mx.rpc.AbstractOperation;
import mx.rpc.AsyncToken;
import mx.rpc.remoting.Operation;
import mx.rpc.remoting.RemoteObject;
import valueObjects.Area;

import mx.collections.ItemResponder;
import com.adobe.fiber.valueobjects.AvailablePropertyIterator;

[ExcludeClass]
internal class _Super_AreaService extends com.adobe.fiber.services.wrapper.RemoteObjectServiceWrapper
{

    // Constructor
    public function _Super_AreaService()
    {
        // initialize service control
        _serviceControl = new mx.rpc.remoting.RemoteObject();

        // initialize RemoteClass alias for all entities returned by functions of this service
        valueObjects.Area._initRemoteClassAlias();

        var operations:Object = new Object();
        var operation:mx.rpc.remoting.Operation;

        operation = new mx.rpc.remoting.Operation(null, "getAreaAll");
         operation.resultElementType = valueObjects.Area;
        operations["getAreaAll"] = operation;

        _serviceControl.operations = operations;
        _serviceControl.convertResultHandler = com.adobe.serializers.utility.TypeUtility.convertResultHandler;
        _serviceControl.source = "AreaService";
        _serviceControl.endpoint = "gateway.php";
        destination = "AreaService";



         model_internal::initialize();
    }

    /**
      * This method is a generated wrapper used to call the 'getAreaAll' operation. It returns an mx.rpc.AsyncToken whose 
      * result property will be populated with the result of the operation when the server response is received. 
      * To use this result from MXML code, define a CallResponder component and assign its token property to this method's return value. 
      * You can then bind to CallResponder.lastResult or listen for the CallResponder.result or fault events.
      *
      * @see mx.rpc.AsyncToken
      * @see mx.rpc.CallResponder 
      *
      * @return an mx.rpc.AsyncToken whose result property will be populated with the result of the operation when the server response is received.
      */
    public function getAreaAll() : mx.rpc.AsyncToken
    {
        var _internal_operation:mx.rpc.AbstractOperation = _serviceControl.getOperation("getAreaAll");
        var _internal_token:mx.rpc.AsyncToken = _internal_operation.send() ;

        return _internal_token;
    }
     
}

}
