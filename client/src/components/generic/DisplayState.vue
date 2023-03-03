<script setup lang="ts">
import { ApolloError } from '@apollo/client/errors';
 defineProps<{
    loading: boolean;
    result: any;
    error: ApolloError | null;
 }>();

</script>

<template>
    <div class="display-state">
        <div v-if="loading" class="flex justify-center">
            <slot name="loading">
                loading ...
            </slot>
        </div>
        <div v-else-if="!error && result">
            <slot name="result">{{ result }}</slot>
        </div>
        <div v-else-if="error" class="flex justify-center">
            <slot name="error">Error: {{error.message}}</slot>
        </div>
    </div>
</template>
