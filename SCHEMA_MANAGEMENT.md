# Schema Management Guide

## 🔒 Preventing Schema Changes

The database schema is now locked to prevent accidental changes that could break the application.

### Available Commands

```bash
# Lock the current schema (prevents changes)
npm run schema:lock

# Check if schema has been modified
npm run schema:check

# Unlock schema for modifications
npm run schema:unlock

# Restore the stable schema
npm run schema:restore
```

### How It Works

1. **Schema Lock**: Creates a hash of the current schema and stores it in `prisma/.schema-lock`
2. **Pre-commit Hook**: Automatically checks schema integrity before commits
3. **Stable Schema**: `prisma/stable-schema.prisma` contains the final, stable version
4. **Change Prevention**: Git hooks prevent commits if schema is modified while locked

### Workflow for Schema Changes

If you need to modify the schema:

1. **Unlock**: `npm run schema:unlock`
2. **Modify**: Make your changes to `prisma/schema.prisma`
3. **Test**: Ensure everything works correctly
4. **Lock**: `npm run schema:lock`
5. **Commit**: Your changes are now protected

### Emergency Schema Reset

If the schema gets corrupted:

```bash
npm run schema:restore
npm run schema:lock
```

## 🎨 Logo Customization

The logo component supports multiple variants:

### Usage

```tsx
import { Broker360Logo } from '@/components/broker360-logo'

// Default logo with tick mark
<Broker360Logo size="md" showText={true} />

// Minimal logo (just "B")
<Broker360Logo variant="minimal" size="lg" />

// Professional logo (nested circles)
<Broker360Logo variant="professional" size="xl" />
```

### Variants

- **default**: Circle with tick mark (current)
- **minimal**: Simple "B" in red circle
- **professional**: Nested circles with "B"

### Customization

To match a specific design:

1. **Modify the component**: Edit `components/broker360-logo.tsx`
2. **Add new variant**: Create a new case in the `renderLogo()` function
3. **Update colors**: Change the color classes (currently using red theme)
4. **Add icon**: Replace the tick mark with your preferred icon

### Example Custom Logo

```tsx
case 'custom':
  return (
    <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
      <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center">
        <span className="text-white font-bold text-lg">🏠</span>
      </div>
    </div>
  )
```

## 🚀 Deployment

The schema is now stable and won't change between deployments. The logo can be easily customized without affecting the core functionality.

### Best Practices

1. **Always lock schema** after making changes
2. **Test thoroughly** before locking
3. **Use stable schema** as backup
4. **Document changes** in commit messages
5. **Keep logo variants** for different contexts
