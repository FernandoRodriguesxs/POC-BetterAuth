// Script para visualizar dados do banco SQLite
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'auth.db');

try {
  const db = new Database(dbPath, { readonly: true });
  
  console.log('🗄️  VISUALIZANDO BANCO DE DADOS');
  console.log('================================\n');
  
  // Listar todas as tabelas
  const tables = db.prepare(`
    SELECT name FROM sqlite_master 
    WHERE type='table' AND name NOT LIKE 'sqlite_%'
  `).all();
  
  console.log('📋 TABELAS ENCONTRADAS:');
  tables.forEach(table => console.log(`  - ${table.name}`));
  console.log('');
  
  // Mostrar dados de cada tabela
  tables.forEach(table => {
    console.log(`📊 DADOS DA TABELA: ${table.name.toUpperCase()}`);
    console.log('-'.repeat(50));
    
    try {
      const rows = db.prepare(`SELECT * FROM ${table.name}`).all();
      
      if (rows.length === 0) {
        console.log('  (Tabela vazia)');
      } else {
        console.table(rows);
      }
    } catch (error) {
      console.log(`  Erro ao ler tabela: ${error.message}`);
    }
    
    console.log('');
  });
  
  db.close();
  
} catch (error) {
  if (error.code === 'SQLITE_CANTOPEN') {
    console.log('❌ Banco de dados não encontrado!');
    console.log('💡 Execute a aplicação primeiro para criar o banco.');
  } else {
    console.error('❌ Erro:', error.message);
  }
}
