import os
from importlib import import_module
from logging.config import fileConfig

from sqlalchemy import engine_from_config, pool
from sqlalchemy.engine import Connection

from alembic import context

from database import Base
import config as cf

# Alembic Config object
config = context.config
config.set_main_option("sqlalchemy.url", cf.config.pg_url)

# Configure logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Dynamically import models to register with Base
def register_models():
    for module_name in os.listdir("./"):
        module_path = f"{module_name}.models"
        try:
            print(f"Attempting to import {module_path}")
            import_module(module_path)
            print(f"Successfully imported {module_path}")
        except Exception as e:
            print(f"Failed to import {module_path}: {str(e)}")

register_models()

# Metadata for autogeneration
target_metadata = Base.metadata

# Offline migration
def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

# Online migration
def run_migrations_online() -> None:
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)

        with context.begin_transaction():
            context.run_migrations()

# Entry point
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
