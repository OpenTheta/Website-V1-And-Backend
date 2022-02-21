
exports.up = function(knex) {
    return knex.schema.createTable('projects', function(table) {
        table.string('contract').notNullable().unique();
        table.primary(['contract']);
        table.string('name').notNullable();
        table.string('creator').notNullable();
        table.integer('tokenNumber');
        table.string('description');
        table.string('imgUrl');
        table.integer('hasMetadata').notNullable();

    }).createTable('marketplace', function(table) {
        table.integer('itemId').notNullable().unique();
        table.primary(['itemId']);
        // table.string('nftContract').notNullable();
        table.integer('tokenId').notNullable();
        table.string('seller').notNullable();
        table.string('owner').notNullable();
        table.string('category').notNullable();
        table.string('price').notNullable();
        table.integer('isSold');
        table.integer('createdTimestamp');
        table.integer('soldTimestamp');
        table.string('name').notNullable();
        table.string('imgUrl').notNullable();
        table.string('description');
        table.string('marketAddress').notNullable();

        table.string('nftContract')
            .notNullable()
            .references('contract')
            .inTable('projects')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')

    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('projects').dropTableIfExists('marketplace');
};
