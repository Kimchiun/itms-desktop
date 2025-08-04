import { getPgClient, ensurePgConnected } from './pgClient';
import * as fs from 'fs';
import * as path from 'path';

export async function initializeDatabase() {
    try {
        // PostgreSQL 연결 확인
        await ensurePgConnected();
        console.log('PostgreSQL 연결: 성공');

        const pgClient = getPgClient();
        if (!pgClient) {
            throw new Error('PostgreSQL 클라이언트가 초기화되지 않았습니다.');
        }

        // 스키마 파일 읽기
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schemaSQL = fs.readFileSync(schemaPath, 'utf8');

        // 스키마 실행
        await pgClient.query(schemaSQL);
        console.log('데이터베이스 스키마 초기화 완료');

        // 테이블 존재 확인
        const tables = ['defects', 'attachments', 'activity_logs', 'comments'];
        for (const table of tables) {
            const result = await pgClient.query(`
                SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_name = $1
                );
            `, [table]);
            
            if (result.rows[0].exists) {
                console.log(`✅ ${table} 테이블 확인됨`);
            } else {
                console.log(`❌ ${table} 테이블이 존재하지 않음`);
            }
        }

        // 샘플 데이터 확인
        const defectCount = await pgClient.query('SELECT COUNT(*) FROM defects');
        console.log(`📊 결함 데이터: ${defectCount.rows[0].count}개`);

        const logCount = await pgClient.query('SELECT COUNT(*) FROM activity_logs');
        console.log(`📊 활동 로그: ${logCount.rows[0].count}개`);

        const commentCount = await pgClient.query('SELECT COUNT(*) FROM comments');
        console.log(`📊 코멘트: ${commentCount.rows[0].count}개`);

    } catch (error) {
        console.error('데이터베이스 초기화 오류:', error);
        throw error;
    }
}

export async function testDatabaseConnection() {
    try {
        const pgClient = getPgClient();
        if (!pgClient) {
            throw new Error('PostgreSQL 클라이언트가 초기화되지 않았습니다.');
        }
        await pgClient.query('SELECT NOW()');
        return true;
    } catch (error) {
        console.error('데이터베이스 연결 테스트 실패:', error);
        return false;
    }
} 