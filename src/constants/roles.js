export const ROLES = {
    ADMIN: 'ROLE_ADMIN',
    STAFF: 'ROLE_STAFF',
    USER: 'ROLE_USER',
    BROKER: 'ROLE_BROKER',
    OWNER: 'ROLE_OWNER'
};

export const ROLE_PERMISSIONS = {
    [ROLES.ADMIN]: ['view', 'edit', 'create'],
    [ROLES.STAFF]: ['view', 'edit', 'create'],
    [ROLES.USER]: ['view'],
    [ROLES.BROKER]: ['view', 'create'],
    [ROLES.OWNER]: ['view', 'edit']
}; 