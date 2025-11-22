-- Demo seed data for testing OpsMind

-- Sample Tasks
INSERT INTO
    tasks (
        task_id,
        source_app,
        title,
        owner,
        status,
        priority,
        due_date,
        links,
        metadata
    )
VALUES (
        'monday_1001',
        'monday',
        'Complete API integration for payment gateway',
        'john@company.com',
        'in_progress',
        3,
        NOW() + INTERVAL '2 days',
        '{"monday_url": "https://monday.com/boards/item/1001"}',
        '{"board_id": "main_sprint"}'
    ),
    (
        'monday_1002',
        'monday',
        'Fix critical bug in authentication module',
        'sarah@company.com',
        'blocked',
        4,
        NOW() - INTERVAL '1 day',
        '{"monday_url": "https://monday.com/boards/item/1002"}',
        '{"board_id": "main_sprint"}'
    ),
    (
        'monday_1003',
        'monday',
        'Update user documentation',
        'mike@company.com',
        'todo',
        2,
        NOW() + INTERVAL '5 days',
        '{"monday_url": "https://monday.com/boards/item/1003"}',
        '{"board_id": "docs"}'
    ),
    (
        'monday_1004',
        'monday',
        'Implement dashboard analytics',
        'john@company.com',
        'in_progress',
        3,
        NOW() - INTERVAL '2 days',
        '{"monday_url": "https://monday.com/boards/item/1004"}',
        '{"board_id": "main_sprint"}'
    ),
    (
        'monday_1005',
        'monday',
        'Database migration for new schema',
        'sarah@company.com',
        'waiting',
        3,
        NOW() + INTERVAL '1 day',
        '{"monday_url": "https://monday.com/boards/item/1005"}',
        '{"board_id": "main_sprint"}'
    ),
    (
        'workast_501',
        'workast',
        'Prepare Q4 presentation',
        'emily@company.com',
        'in_progress',
        2,
        NOW() + INTERVAL '3 days',
        '{}',
        '{}'
    ),
    (
        'workast_502',
        'workast',
        'Review PR #342',
        'john@company.com',
        'todo',
        1,
        NOW() + INTERVAL '1 day',
        '{}',
        '{}'
    ),
    (
        'monday_1006',
        'monday',
        'Security audit completion',
        'mike@company.com',
        'in_progress',
        4,
        NOW() - INTERVAL '3 days',
        '{"monday_url": "https://monday.com/boards/item/1006"}',
        '{"board_id": "security"}'
    );

-- Sample Incidents
INSERT INTO
    incidents (
        incident_id,
        source_app,
        severity,
        summary,
        logs,
        root_cause,
        timestamp,
        status,
        metadata
    )
VALUES (
        'zenduty_2001',
        'zenduty',
        'critical',
        'API Gateway timeout - 503 errors',
        '{"description": "Users experiencing 503 errors on payment endpoint", "impacted_services": ["payment-api", "checkout"]}',
        NULL,
        NOW() - INTERVAL '2 hours',
        'open',
        '{"incident_url": "https://www.zenduty.com/incidents/2001"}'
    ),
    (
        'zenduty_2002',
        'zenduty',
        'high',
        'Database connection pool exhausted',
        '{"description": "DB connection pool reached max capacity", "impacted_services": ["user-service", "auth-service"]}',
        'Insufficient connection pool size',
        NOW() - INTERVAL '1 day',
        'closed',
        '{"incident_url": "https://www.zenduty.com/incidents/2002"}'
    ),
    (
        'zenduty_2003',
        'zenduty',
        'medium',
        'Slow query performance on reports',
        '{"description": "Report generation taking 30+ seconds", "impacted_services": ["analytics"]}',
        NULL,
        NOW() - INTERVAL '5 hours',
        'open',
        '{"incident_url": "https://www.zenduty.com/incidents/2003"}'
    ),
    (
        'zenduty_2004',
        'zenduty',
        'critical',
        'API Gateway timeout - 503 errors',
        '{"description": "Recurring 503 errors same as incident 2001", "impacted_services": ["payment-api"]}',
        NULL,
        NOW() - INTERVAL '30 minutes',
        'open',
        '{"incident_url": "https://www.zenduty.com/incidents/2004"}'
    ),
    (
        'zenduty_2005',
        'zenduty',
        'high',
        'Redis cache connection failures',
        '{"description": "Cache layer experiencing intermittent failures", "impacted_services": ["all"]}',
        NULL,
        NOW() - INTERVAL '6 hours',
        'open',
        '{"incident_url": "https://www.zenduty.com/incidents/2005"}'
    );

-- Sample Time Logs
INSERT INTO
    timelogs (
        user_id,
        date,
        hours_worked,
        meetings_count,
        focus_score,
        metadata
    )
VALUES (
        'john@company.com',
        CURRENT_DATE,
        9.5,
        4,
        0.55,
        '{"notes": "Heavy meeting day"}'
    ),
    (
        'john@company.com',
        CURRENT_DATE - 1,
        10.0,
        5,
        0.50,
        '{"notes": "Sprint planning"}'
    ),
    (
        'john@company.com',
        CURRENT_DATE - 2,
        8.5,
        3,
        0.65,
        '{}'
    ),
    (
        'john@company.com',
        CURRENT_DATE - 3,
        11.0,
        6,
        0.45,
        '{"notes": "Too many meetings"}'
    ),
    (
        'sarah@company.com',
        CURRENT_DATE,
        8.0,
        2,
        0.75,
        '{}'
    ),
    (
        'sarah@company.com',
        CURRENT_DATE - 1,
        12.0,
        7,
        0.40,
        '{"notes": "Overloaded"}'
    ),
    (
        'sarah@company.com',
        CURRENT_DATE - 2,
        10.5,
        5,
        0.50,
        '{}'
    ),
    (
        'mike@company.com',
        CURRENT_DATE,
        7.5,
        1,
        0.85,
        '{"notes": "Deep work day"}'
    ),
    (
        'mike@company.com',
        CURRENT_DATE - 1,
        8.0,
        2,
        0.80,
        '{}'
    ),
    (
        'emily@company.com',
        CURRENT_DATE,
        9.0,
        3,
        0.70,
        '{}'
    );

-- Sample Expenses
INSERT INTO
    expenses (
        transaction_id,
        merchant,
        amount,
        category,
        timestamp,
        user_id,
        metadata
    )
VALUES (
        'brex_3001',
        'AWS',
        2450.00,
        'Infrastructure',
        NOW() - INTERVAL '1 day',
        'devops@company.com',
        '{"subscription": "monthly"}'
    ),
    (
        'brex_3002',
        'Datadog',
        890.00,
        'Monitoring',
        NOW() - INTERVAL '2 days',
        'devops@company.com',
        '{"subscription": "monthly"}'
    ),
    (
        'brex_3003',
        'Google Cloud AI',
        0.00,
        'AI Services',
        NOW() - INTERVAL '3 days',
        'ai-team@company.com',
        '{"usage": "Gemini 1.5 Flash - Free Tier"}'
    ),
    (
        'brex_3004',
        'Slack Premium',
        450.00,
        'Communication',
        NOW() - INTERVAL '5 days',
        'admin@company.com',
        '{"subscription": "monthly"}'
    ),
    (
        'brex_3005',
        'GitHub Enterprise',
        1200.00,
        'Development Tools',
        NOW() - INTERVAL '1 week',
        'admin@company.com',
        '{"subscription": "monthly"}'
    ),
    (
        'brex_3006',
        'Vercel Pro',
        320.00,
        'Hosting',
        NOW() - INTERVAL '2 days',
        'frontend@company.com',
        '{"subscription": "monthly"}'
    ),
    (
        'brex_3007',
        'Figma Enterprise',
        780.00,
        'Design Tools',
        NOW() - INTERVAL '4 days',
        'design@company.com',
        '{"subscription": "monthly"}'
    ),
    (
        'brex_3008',
        'Monday.com',
        599.00,
        'Project Management',
        NOW() - INTERVAL '3 days',
        'admin@company.com',
        '{"subscription": "monthly"}'
    ),
    (
        'brex_3009',
        'AWS',
        3200.00,
        'Infrastructure',
        NOW() - INTERVAL '1 hour',
        'devops@company.com',
        '{"note": "Spike in usage - investigate!"}'
    );

-- Sample Document Updates
INSERT INTO
    document_updates (
        doc_id,
        source_app,
        title,
        changes,
        updated_at,
        updated_by,
        metadata
    )
VALUES (
        'coda_401',
        'coda',
        'API Design Specification v2',
        'Updated authentication flow section with OAuth2 implementation details',
        NOW() - INTERVAL '3 hours',
        'john@company.com',
        '{"doc_url": "https://coda.io/d/api-spec"}'
    ),
    (
        'coda_402',
        'coda',
        'Sprint Planning - Q4',
        'Added new features to backlog, updated velocity metrics',
        NOW() - INTERVAL '1 day',
        'emily@company.com',
        '{"doc_url": "https://coda.io/d/sprint-plan"}'
    ),
    (
        'coda_403',
        'coda',
        'Incident Runbook',
        'Updated escalation procedures and on-call rotation',
        NOW() - INTERVAL '2 days',
        'mike@company.com',
        '{"doc_url": "https://coda.io/d/runbook"}'
    ),
    (
        'quip_201',
        'quip',
        'Team OKRs Q4 2025',
        'Updated progress on key results',
        NOW() - INTERVAL '5 hours',
        'sarah@company.com',
        '{}'
    );

-- Analysis: This seed data creates a realistic scenario with:
-- 1. Multiple overdue tasks (3 tasks overdue)
-- 2. Blocked tasks (1 critical task)
-- 3. Overloaded team members (john and sarah with 50+ hours/week)
-- 4. Repeating incidents (API Gateway timeout appears twice)
-- 5. Expense spike (AWS bill jumped from $2450 to $3200)
-- 6. Recent doc updates

-- This will demonstrate all OpsMind features effectively in the demo