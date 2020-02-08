import { Firestore } from '@google-cloud/firestore';

const firestore = new Firestore();

const PO_BOX_COLLECTION = 'poBoxes';
const COURIER_COLLECTION = 'couriers';
const CUSTOMER_COLLECTION = 'customers';
const CUSTOMER_ORDER_COLLECTION = 'orders';
const TRIP_COLLECTION = 'trips';

export const addCustomerOrder = async (order) => {
    const result = await firestore.collection(CUSTOMER_ORDER_COLLECTION).add(order);
    return result.id;
}

export const getCustomerOrder = async (id) => {
    const doc = await firestore.collection(CUSTOMER_ORDER_COLLECTION).doc(id).get();
    return doc.data();
}

export const addCustomer = async (customer) => {
    const result = await firestore.collection(CUSTOMER_COLLECTION).add(customer);
    return result.id;
}

export const getCustomer = async (userId) => {
    const doc = await firestore.collection(CUSTOMER_COLLECTION).doc(userId).get();
    return doc.data();
}

export const addTrip = async (trip) => {
    const result = await firestore.collection(TRIP_COLLECTION).add(trip);
    return result.id;
}

export const getTrips = async (userId) => {
    const trips = await firestore.collection(TRIP_COLLECTION)
        .where('userId', '==', userId)
        .get();

    return trips.docs.map(doc => doc.data());
}

export const addCourier = async (courier) => {
    const result = await firestore.collection(COURIER_COLLECTION).add(courier);
    return result.id;
}

export const getCourier = async (userId) => {
    const doc = await firestore.collection(COURIER_COLLECTION).doc(userId).get();
    return doc.data();
}

export const addPOBox = async (box) => {
    const result = await firestore.collection(PO_BOX_COLLECTION).add(box);
    return result.id;
}

export const getPOBox = async (id) => {
    const doc = await firestore.collection(PO_BOX_COLLECTION).doc(id).get();
    return doc.data();
}
