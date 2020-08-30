import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1598472135523
    implements MigrationInterface {
    // "oque será feito no banco de dados quando essa migration for executada"
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'provider',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'date',
                        type: 'timestamp with time zone',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );
    }

    // "desfaz oque foi feito no método up"
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments');
    }
}

// Analogia: Oque o git faz para o código as migrations fazem para o banco de dados
// É uma ferramenta utilizada para garantir que as alterações feitas em um banco sejam
// refletidas para todos os desenvolvedores que trabalham com ele.

// Só se pode alterar uma migration se ela não tiver sido enviada para um sistema de controle
// de versão
