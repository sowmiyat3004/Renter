"use strict";(()=>{var E={};E.id=896,E.ids=[896],E.modules={53524:E=>{E.exports=require("@prisma/client")},20399:E=>{E.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:E=>{E.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},84770:E=>{E.exports=require("crypto")},62399:(E,e,T)=>{T.r(e),T.d(e,{originalPathname:()=>I,patchFetch:()=>u,requestAsyncStorage:()=>R,routeModule:()=>o,serverHooks:()=>U,staticGenerationAsyncStorage:()=>A});var i={};T.r(i),T.d(i,{GET:()=>L,POST:()=>d});var t=T(49303),a=T(88716),r=T(60670),s=T(87070);let N=new(T(53524)).PrismaClient;async function n(){await N.$executeRaw`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT,
      google_id TEXT UNIQUE,
      role TEXT DEFAULT 'USER',
      email_verified TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `,await N.$executeRaw`
    CREATE TABLE IF NOT EXISTS listings (
      id TEXT PRIMARY KEY,
      owner_id TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      price_amount REAL NOT NULL,
      currency TEXT DEFAULT 'INR',
      bedrooms INTEGER NOT NULL,
      bathrooms INTEGER NOT NULL,
      state TEXT NOT NULL,
      district TEXT,
      city TEXT NOT NULL,
      locality TEXT,
      address TEXT,
      lat REAL NOT NULL,
      lng REAL NOT NULL,
      status TEXT DEFAULT 'PENDING',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `,await N.$executeRaw`
    CREATE TABLE IF NOT EXISTS listing_images (
      id TEXT PRIMARY KEY,
      listing_id TEXT NOT NULL,
      url TEXT NOT NULL,
      is_primary BOOLEAN DEFAULT FALSE,
      width INTEGER,
      height INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
    )
  `,await N.$executeRaw`
    CREATE TABLE IF NOT EXISTS amenities (
      id TEXT PRIMARY KEY,
      name TEXT UNIQUE NOT NULL
    )
  `,await N.$executeRaw`
    CREATE TABLE IF NOT EXISTS listing_amenities (
      id TEXT PRIMARY KEY,
      listing_id TEXT NOT NULL,
      amenity_id TEXT NOT NULL,
      UNIQUE(listing_id, amenity_id),
      FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
      FOREIGN KEY (amenity_id) REFERENCES amenities(id) ON DELETE CASCADE
    )
  `,await N.$executeRaw`
    CREATE TABLE IF NOT EXISTS admin_actions (
      id TEXT PRIMARY KEY,
      admin_id TEXT NOT NULL,
      listing_id TEXT NOT NULL,
      action_type TEXT NOT NULL,
      reason TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
    )
  `,await N.$executeRaw`
    CREATE TABLE IF NOT EXISTS notifications (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      listing_id TEXT,
      is_read BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `,await N.$executeRaw`
    CREATE TABLE IF NOT EXISTS system_config (
      id TEXT PRIMARY KEY,
      key TEXT UNIQUE NOT NULL,
      value TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `,console.log("✅ Database tables created successfully");let E=T(42023),e=await E.hash("admin123",10),i=await E.hash("user123",10);await N.user.upsert({where:{email:"admin@renter.com"},update:{},create:{id:"admin-001",name:"Super Admin",email:"admin@renter.com",passwordHash:e,role:"SUPER_ADMIN",emailVerified:new Date}}),await N.user.upsert({where:{email:"user@renter.com"},update:{},create:{id:"user-001",name:"Test User",email:"user@renter.com",passwordHash:i,role:"USER",emailVerified:new Date}}),await N.user.upsert({where:{email:"moderator@renter.com"},update:{},create:{id:"mod-001",name:"Moderator",email:"moderator@renter.com",passwordHash:e,role:"ADMIN",emailVerified:new Date}}),console.log("✅ Test users created successfully"),console.log("\uD83D\uDCE7 Admin: admin@renter.com / admin123"),console.log("\uD83D\uDCE7 User: user@renter.com / user123"),console.log("\uD83D\uDCE7 Moderator: moderator@renter.com / admin123")}async function L(E){try{return console.log("Starting database migration via GET request..."),await n(),s.NextResponse.json({success:!0,message:"Database migration completed successfully via GET request"})}catch(E){return console.error("Migration error:",E),s.NextResponse.json({error:"Migration failed",details:E instanceof Error?E.message:"Unknown error"},{status:500})}finally{await N.$disconnect()}}async function d(E){try{let e=E.headers.get("authorization"),T=process.env.MIGRATION_TOKEN||"your-migration-token";if(e!==`Bearer ${T}`)return s.NextResponse.json({error:"Unauthorized"},{status:401});return console.log("Starting database migration..."),await N.$executeRaw`CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT,
      google_id TEXT UNIQUE,
      role TEXT DEFAULT 'USER',
      email_verified TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,await N.$executeRaw`CREATE TABLE IF NOT EXISTS listings (
      id TEXT PRIMARY KEY,
      owner_id TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      price_amount REAL NOT NULL,
      currency TEXT DEFAULT 'INR',
      bedrooms INTEGER NOT NULL,
      bathrooms INTEGER NOT NULL,
      state TEXT NOT NULL,
      city TEXT NOT NULL,
      address TEXT,
      lat REAL NOT NULL,
      lng REAL NOT NULL,
      status TEXT DEFAULT 'PENDING',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
    )`,await N.$executeRaw`CREATE TABLE IF NOT EXISTS listing_images (
      id TEXT PRIMARY KEY,
      listing_id TEXT NOT NULL,
      url TEXT NOT NULL,
      is_primary BOOLEAN DEFAULT FALSE,
      width INTEGER,
      height INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
    )`,await N.$executeRaw`CREATE TABLE IF NOT EXISTS amenities (
      id TEXT PRIMARY KEY,
      name TEXT UNIQUE NOT NULL
    )`,await N.$executeRaw`CREATE TABLE IF NOT EXISTS listing_amenities (
      id TEXT PRIMARY KEY,
      listing_id TEXT NOT NULL,
      amenity_id TEXT NOT NULL,
      UNIQUE(listing_id, amenity_id),
      FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
      FOREIGN KEY (amenity_id) REFERENCES amenities(id) ON DELETE CASCADE
    )`,await N.$executeRaw`CREATE TABLE IF NOT EXISTS admin_actions (
      id TEXT PRIMARY KEY,
      admin_id TEXT NOT NULL,
      listing_id TEXT NOT NULL,
      action_type TEXT NOT NULL,
      reason TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
    )`,await N.$executeRaw`CREATE TABLE IF NOT EXISTS notifications (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      listing_id TEXT,
      is_read BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`,await N.$executeRaw`CREATE TABLE IF NOT EXISTS system_config (
      id TEXT PRIMARY KEY,
      key TEXT UNIQUE NOT NULL,
      value TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,console.log("Database migration completed successfully"),s.NextResponse.json({success:!0,message:"Database migration completed successfully"})}catch(E){return console.error("Migration error:",E),s.NextResponse.json({error:"Migration failed",details:E instanceof Error?E.message:"Unknown error"},{status:500})}finally{await N.$disconnect()}}let o=new t.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/migrate/route",pathname:"/api/migrate",filename:"route",bundlePath:"app/api/migrate/route"},resolvedPagePath:"/Users/sowmiya/Renter/Renter/app/api/migrate/route.ts",nextConfigOutput:"",userland:i}),{requestAsyncStorage:R,staticGenerationAsyncStorage:A,serverHooks:U}=o,I="/api/migrate/route";function u(){return(0,r.patchFetch)({serverHooks:U,staticGenerationAsyncStorage:A})}}};var e=require("../../../webpack-runtime.js");e.C(E);var T=E=>e(e.s=E),i=e.X(0,[276,972,23],()=>T(62399));module.exports=i})();