-- OpsMind Database Schema

-- Tasks Table
CREATE TABLE IF NOT EXISTS tasks (
    task_id VARCHAR(255) PRIMARY KEY,
    source_app VARCHAR(50) NOT NULL,
    title TEXT NOT NULL,
    owner VARCHAR(255),
    status VARCHAR(50),
    priority INTEGER DEFAULT 0,
    due_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    links JSONB,
    metadata JSONB
);

CREATE INDEX idx_tasks_status ON tasks (status);

CREATE INDEX idx_tasks_owner ON tasks (owner);

CREATE INDEX idx_tasks_due_date ON tasks (due_date);

-- Incidents Table
CREATE TABLE IF NOT EXISTS incidents (
    incident_id VARCHAR(255) PRIMARY KEY,
    source_app VARCHAR(50) NOT NULL,
    severity VARCHAR(20),
    summary TEXT,
    logs JSONB,
    root_cause TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'open',
    metadata JSONB
);

CREATE INDEX idx_incidents_severity ON incidents (severity);

CREATE INDEX idx_incidents_timestamp ON incidents (timestamp);

CREATE INDEX idx_incidents_status ON incidents (status);

-- Time Logs Table
CREATE TABLE IF NOT EXISTS timelogs (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    hours_worked DECIMAL(5, 2),
    meetings_count INTEGER DEFAULT 0,
    focus_score DECIMAL(3, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB,
    UNIQUE (user_id, date)
);

CREATE INDEX idx_timelogs_user_date ON timelogs (user_id, date);

-- Expenses Table
CREATE TABLE IF NOT EXISTS expenses (
    transaction_id VARCHAR(255) PRIMARY KEY,
    merchant VARCHAR(255),
    amount DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id VARCHAR(255),
    metadata JSONB
);

CREATE INDEX idx_expenses_category ON expenses (category);

CREATE INDEX idx_expenses_timestamp ON expenses (timestamp);

CREATE INDEX idx_expenses_user ON expenses (user_id);

-- Document Updates Table
CREATE TABLE IF NOT EXISTS document_updates (
    doc_id VARCHAR(255) PRIMARY KEY,
    source_app VARCHAR(50) NOT NULL,
    title TEXT NOT NULL,
    changes TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(255),
    metadata JSONB
);

CREATE INDEX idx_docs_updated_at ON document_updates (updated_at);

-- Analysis Cache Table (stores computed insights)
CREATE TABLE IF NOT EXISTS analysis_cache (
    id SERIAL PRIMARY KEY,
    analysis_type VARCHAR(50) NOT NULL,
    result JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP
);

CREATE INDEX idx_analysis_type ON analysis_cache (analysis_type);

CREATE INDEX idx_analysis_expires ON analysis_cache (expires_at);