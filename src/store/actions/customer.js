import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const addCustomerSuccess = ( id, customerData ) => {
    return {
        type: actionTypes.ADD_CUSTOMER_SUCCESS,
        customerId: id,
        customerData: customerData
    };
};

export const addCustomerFail = ( error ) => {
    return {
        type: actionTypes.ADD_CUSTOMER_FAIL,
        error: error
    };
}

export const addCustomerStart = () => {
    return {
        type: actionTypes.ADD_CUSTOMER_START
    };
};

export const addCustomer = ( customerData/*, token*/) => {
    return dispatch => {
        dispatch( addCustomerStart() );
        axios.post( '/Customers.json',customerData)
            .then( response => {
                dispatch( addCustomerSuccess( response.data.name, customerData ) );
            } )
            .catch( error => {
                dispatch( addCustomerFail( error ) );
            } );
    };
};

export const addCustomerInit = () => {
    return {
        type: actionTypes.ADD_CUSTOMER_INIT
    };
};

export const editCustomerSuccess = ( id, customerData ) => {
    return {
        type: actionTypes.EDIT_CUSTOMER_SUCCESS,
        customerId: id,
        customerData: customerData
    };
};

export const editCustomerFail = ( error ) => {
    return {
        type: actionTypes.EDIT_CUSTOMER_FAIL,
        error: error
    };
}

export const editCustomerStart = () => {
    return {
        type: actionTypes.EDIT_CUSTOMER_START
    };
};

export const editCustomer = ( customerId,customer) => {
    return dispatch => {
        dispatch( editCustomerStart() );
       
        axios.put(`/Customers/${customerId}.json`,customer)
            .then( response => {
                dispatch(editCustomerSuccess(customerId,customer) );
            } )
            .catch( error => {
                dispatch(editCustomerFail( error ) );
            } );
    };
};

export const editCustomerInit = () => {
    return {
        type: actionTypes.EDIT_CUSTOMER_INIT
    };
};




export const removeCustomerSuccess = ( id, customerData ) => {
    return {
        type: actionTypes.REMOVE_CUSTOMER_SUCCESS,
        customerId: id,
        customerData: customerData
    };
};

export const removeCustomerFail = ( error ) => {
    return {
        type: actionTypes.REMOVE_CUSTOMER_FAIL,
        error: error
    };
}

export const removeCustomerStart = () => {
    return {
        type: actionTypes.REMOVE_CUSTOMER_START
    };
};

export const removeCustomer = ( customerId/*, token*/) => {
    return dispatch => {
        dispatch( removeCustomerStart() );
       
        axios.delete(`/Customers/${customerId}.json`)
            .then( response => {
                dispatch(removeCustomerSuccess(customerId) );
            } )
            .catch( error => {
                console.log('error is'+error)
                // dispatch(removeCustomerFail( error ) );
            } );
    };
};

export const removeCustomerInit = () => {
    return {
        type: actionTypes.REMOVE_CUSTOMER_INIT
    };
};

export const fetchCustomersSuccess = ( customers ) => {
    return {
        type: actionTypes.FETCH_CUSTOMERS_SUCCESS,
        customers: customers
    };
};

export const fetchCustomersFail = ( error ) => {
    return {
        type: actionTypes.FETCH_CUSTOMERS_FAIL,
        error: error
    };
};

export const fetchCustomersStart = () => {
    return {
        type: actionTypes.FETCH_CUSTOMERS_START
    };
};

export const fetchCustomers = (/*token, userId*/) => {
    return dispatch => {
        dispatch(fetchCustomersStart());
        // const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get( '/Customers.json')
            .then( res => {
                console.log("resdata=>" + JSON.stringify(res.data))
                const fetchedCustomers = [];
                for ( let key in res.data ) {
                    fetchedCustomers.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                dispatch(fetchCustomersSuccess(fetchedCustomers));
            } )
            .catch( err => {
                dispatch(fetchCustomersFail(err));
            } );
    };
};