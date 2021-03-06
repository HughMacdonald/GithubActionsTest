'use strict';

import { Client } from 'ts-postgres';

describe( 'Database connection tests', () => {

    test( 'Can connect to database', async () => {
        const connectionDetails = {
            host: "localhost",
            port: 5432,
            user: "actions_test",
            password: "",
            database: "actions_test"
        };

        console.log( "Creating new client" );
        console.log( connectionDetails );
        const client = new Client();

        console.log( "Connecting" );

        await client.connect();

        console.log( "Executing query" );

        await client.query( `SELECT EXISTS
            (
                SELECT 1
                FROM information_schema.tables
                WHERE table_schema = 'public'
                AND table_name = $1::text
            );`,
                [ "MyTable" ] );

        console.log( "Disconnecting" );
        await client.end();

        console.log( "Done" );
    });
});
