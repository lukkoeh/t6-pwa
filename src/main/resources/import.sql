create table if not exists cards_SEQ
(
    next_not_cached_value bigint(21)          not null,
    minimum_value         bigint(21)          not null,
    maximum_value         bigint(21)          not null,
    start_value           bigint(21)          not null comment 'start value when sequences is created or value if RESTART is used',
    increment             bigint(21)          not null comment 'increment value',
    cache_size            bigint(21) unsigned not null,
    cycle_option          tinyint(1) unsigned not null comment '0 if no cycles are allowed, 1 if the sequence should begin a new cycle when maximum_value is passed',
    cycle_count           bigint(21)          not null comment 'How many cycles have been done'
);

create table if not exists stacks_SEQ
(
    next_not_cached_value bigint(21)          not null,
    minimum_value         bigint(21)          not null,
    maximum_value         bigint(21)          not null,
    start_value           bigint(21)          not null comment 'start value when sequences is created or value if RESTART is used',
    increment             bigint(21)          not null comment 'increment value',
    cache_size            bigint(21) unsigned not null,
    cycle_option          tinyint(1) unsigned not null comment '0 if no cycles are allowed, 1 if the sequence should begin a new cycle when maximum_value is passed',
    cycle_count           bigint(21)          not null comment 'How many cycles have been done'
);

create table if not exists user
(
    id       bigint       not null
        primary key,
    password varchar(255) null,
    role     varchar(255) null,
    username varchar(255) null
);

create table if not exists stacks
(
    id      bigint       not null
        primary key,
    user_id bigint       not null,
    name    varchar(255) null,
    constraint FKhyruc4egc7h4rl3wbs7a1fuh0
        foreign key (user_id) references user (id)
);

create table if not exists cards
(
    probability float        not null,
    id          bigint       not null
        primary key,
    stack_id    bigint       not null,
    back        varchar(255) null,
    front       varchar(255) null,
    constraint FKr6tvo2jc0ht11h1vgnlargkqh
        foreign key (stack_id) references stacks (id)
);

create table if not exists user_SEQ
(
    next_not_cached_value bigint(21)          not null,
    minimum_value         bigint(21)          not null,
    maximum_value         bigint(21)          not null,
    start_value           bigint(21)          not null comment 'start value when sequences is created or value if RESTART is used',
    increment             bigint(21)          not null comment 'increment value',
    cache_size            bigint(21) unsigned not null,
    cycle_option          tinyint(1) unsigned not null comment '0 if no cycles are allowed, 1 if the sequence should begin a new cycle when maximum_value is passed',
    cycle_count           bigint(21)          not null comment 'How many cycles have been done'
);

