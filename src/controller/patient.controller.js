import database from '../config/mysql.config.js';
import Response from '../domain/response.js';
import logger from '../util/logger.js';
import QUERY from '../query/patient.query.js';

const httpStatus = {
    OK: { code: 200, status: 'OK' },
    CREATED: { code: 201, status: 'CREATED' },
    NO_CONTENT: { code: 204, status: 'NO_CONTENT' },
    BAD_REQUEST: { code: 400, status: 'BAD_REQUEST' },
    NOT_FOUND: { code: 404, status: 'NOT_FOUND' },
    INTERNAL_SERVER_ERROR: { code: 500, status: 'INTERNAL_SERVER_ERROR' },
};

export const getPatients = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching patients`);
    database.query(QUERY.SELECT_PATIENTS, (error, results) => {
        if (!results) {
            res.status(httpStatus.OK.code).send(
                new Response(
                    httpStatus.OK.code,
                    httpStatus.OK.status,
                    `No patients found`
                )
            );
        } else {
            res.status(httpStatus.OK.code).send(
                new Response(
                    httpStatus.OK.code,
                    httpStatus.OK.status,
                    `Patients retrieved`,
                    { patients: results }
                )
            );
        }
    });
};

export const createPatient = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, creating patient`);
    database.query(
        QUERY.CREATE_PATIENT,
        Object.values(req.body),
        (error, results) => {
            if (!results) {
                logger.error(error.message);
                res.status(httpStatus.INTERNAL_SERVER_ERROR.code).send(
                    new Response(
                        httpStatus.INTERNAL_SERVER_ERROR.code,
                        httpStatus.INTERNAL_SERVER_ERROR.status,
                        `Error occured`
                    )
                );
            } else {
                const patient = {
                    id: results.insertedId,
                    ...req.body,
                    created_at: new Date(),
                };
                res.status(httpStatus.CREATED.code).send(
                    new Response(
                        httpStatus.CREATED.code,
                        httpStatus.CREATED.status,
                        `Patient created`,
                        { patient }
                    )
                );
            }
        }
    );
};

export const getPatient = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching patient`);
    database.query(QUERY.SELECT_PATIENT, [req.params.id], (error, results) => {
        if (!results[0]) {
            res.status(httpStatus.NOT_FOUND.code).send(
                new Response(
                    httpStatus.NOT_FOUND.code,
                    httpStatus.NOT_FOUND.status,
                    `Patient by id ${req.params.id} was not found`
                )
            );
        } else {
            res.status(httpStatus.OK.code).send(
                new Response(
                    httpStatus.OK.code,
                    httpStatus.OK.status,
                    `Patient retrieved`,
                    patient[0]
                )
            );
        }
    });
};

export const updatePatient = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching patient`);
    database.query(QUERY.SELECT_PATIENT, [req.params.id], (error, results) => {
        if (!results[0]) {
            res.status(httpStatus.NOT_FOUND.code).send(
                new Response(
                    httpStatus.NOT_FOUND.code,
                    httpStatus.NOT_FOUND.status,
                    `Patient by id ${req.params.id} was not found`
                )
            );
        } else {
            logger.info(`${req.method} ${req.originalUrl}, updating patient`);
            database.query(
                QUERY.UPDATE_PATIENT,
                [...Object.values(req.body), req.params.id],
                (error, results) => {
                    if (!error) {
                        res.status(httpStatus.OK.code).send(
                            new Response(
                                httpStatus.OK.code,
                                httpStatus.OK.status,
                                `Patient updated`,
                                { id: req.params.id, ...req.body }
                            )
                        );
                    } else {
                        logger.error(error.message);
                        res.status(httpStatus.INTERNAL_SERVER_ERROR.code).send(
                            new Response(
                                httpStatus.INTERNAL_SERVER_ERROR.code,
                                httpStatus.INTERNAL_SERVER_ERROR.status,
                                `Error occurred`
                            )
                        );
                    }
                }
            );
        }
    });
};

export const deletePatient = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, deleting patient`);
    database.query(QUERY.DELETE_PATIENT, [req.params.id], (error, results) => {
        if (results.affectedRows > 0) {
            res.status(httpStatus.OK.code).send(
                new Response(
                    httpStatus.OK.code,
                    httpStatus.OK.status,
                    `Patient deleted`,
                    patient[0]
                )
            );
        } else {
            res.status(httpStatus.NOT_FOUND.code).send(
                new Response(
                    httpStatus.NOT_FOUND.code,
                    httpStatus.NOT_FOUND.status,
                    `Patient by id ${req.params.id} was not found`
                )
            );
        }
    });
};

export default httpStatus;
