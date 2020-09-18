'use strict';

// import { Client } from 'ts-postgres';
import { Client } from 'pg';

describe( 'Database connection tests', () => {

    test( 'Can connect to database', async () => {
        const connectionDetails = {
            connectionString: "postgres://actions_test:actions_test@localhost:5432/actions_test"
        };
        // const connectionDetails = {
        //     host: "localhost",
        //     port: 5432,
        //     user: "actions_test",
        //     password: "actions_test",
        //     database: "actions_test"
        // };

        console.log( "Creating new client" );
        console.log( connectionDetails );
        const client = new Client( connectionDetails );

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
