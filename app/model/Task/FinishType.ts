/**
 * Defines the type of task completion.
 */
export enum FinishType {
    /**
     * Task is completed immediately after the activity is finished.
     */
    AFTER_ACTIVITY = 'after-activity',

    /**
     * Task is completed after the database has been updated with the activity results.
     */
    AFTER_DATABASE_UPDATE = 'after-database-update',

    /**
     * Task is completed after the user has selected options related to the activity.
     */
    SELECT_OPTIONS = 'select-options'
}
