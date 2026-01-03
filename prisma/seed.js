async function main() {
    console.log('🌱 Seeding database with dummy data...')

    // ---------- USERS ----------
    const users = await Promise.all([
        prisma.user.upsert({
            where: { email: 'vajin001@umn.edu' },
            update: {},
            create: {
                firstName: 'Varshith',
                lastName: 'Vajinapelli',
                email: 'vajin001@umn.edu',
                password: 'hashed-password-1',
            },
        }),
        prisma.user.upsert({
            where: { email: 'bob@umn.edu' },
            update: {},
            create: {
                firstName: 'Bob',
                lastName: 'Smith',
                email: 'bob@umn.edu',
                password: 'hashed-password-2',
            },
        }),
        prisma.user.upsert({
            where: { email: 'alice@umn.edu' },
            update: {},
            create: {
                firstName: 'Alice',
                lastName: 'Johnson',
                email: 'alice@umn.edu',
                password: 'hashed-password-3',
            },
        }),
        prisma.user.upsert({
            where: { email: 'rahul@umn.edu' },
            update: {},
            create: {
                firstName: 'Rahul',
                lastName: 'Kumar',
                email: 'rahul@umn.edu',
                password: 'hashed-password-4',
            },
        }),
        prisma.user.upsert({
            where: { email: 'sneha@umn.edu' },
            update: {},
            create: {
                firstName: 'Sneha',
                lastName: 'Patel',
                email: 'sneha@umn.edu',
                password: 'hashed-password-5',
            },
        }),
    ])

    const [varshith, bob, alice, rahul, sneha] = users

    // ---------- EVENTS ----------
    const events = await Promise.all([
        prisma.event.create({
            data: {
                title: 'Gopher Tech Meetup',
                description: 'Intro meetup for CS students',
                venue: 'UMN Coffman Hall',
                creatorId: varshith.id,
            },
        }),
        prisma.event.create({
            data: {
                title: 'AI & ML Workshop',
                description: 'Hands-on ML basics',
                venue: 'Keller Hall 3-180',
                creatorId: alice.id,
            },
        }),
        prisma.event.create({
            data: {
                title: 'Startup Networking Night',
                description: 'Meet founders and builders',
                venue: 'McNamara Alumni Center',
                creatorId: rahul.id,
            },
        }),
        prisma.event.create({
            data: {
                title: 'LeetCode Study Jam',
                description: 'Group problem solving session',
                venue: 'Walter Library',
                creatorId: varshith.id,
            },
        }),
    ])

    const [event1, event2, event3, event4] = events

    // ---------- ATTENDANCE (UserEvent) ----------
    await prisma.userEvent.createMany({
        data: [
            { userId: bob.id, eventId: event1.id },
            { userId: alice.id, eventId: event1.id },
            { userId: rahul.id, eventId: event1.id },

            { userId: varshith.id, eventId: event2.id },
            { userId: sneha.id, eventId: event2.id },

            { userId: bob.id, eventId: event3.id },
            { userId: sneha.id, eventId: event3.id },

            { userId: alice.id, eventId: event4.id },
            { userId: rahul.id, eventId: event4.id },
            { userId: sneha.id, eventId: event4.id },
        ],
        skipDuplicates: true, // respects composite PK
    })

    console.log('✅ Seeding finished successfully')
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })


