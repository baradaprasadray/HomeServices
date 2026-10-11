import { ServiceItem, Professional, CustomerReview } from '../types/service';

// Service images - all 12 generated high-fidelity photographic assets
import plumbingImg from '../assets/images/service_plumbing_1791614461545.jpg';
import electricianImg from '../assets/images/service_electrician_1791614482428.jpg';
import carpentryImg from '../assets/images/service_carpentry_1791614511014.jpg';
import acImg from '../assets/images/service_ac_cooling_1791614539859.jpg';
import paintingImg from '../assets/images/service_painting_1791614572753.jpg';
import cleaningImg from '../assets/images/service_cleaning_1791616531799.jpg';
import masonryImg from '../assets/images/service_masonry_1791616545622.jpg';
import pestImg from '../assets/images/service_pest_control_1791616555886.jpg';
import gardeningImg from '../assets/images/service_gardening_1791616567770.jpg';
import shiftingImg from '../assets/images/service_shifting_1791616616585.jpg';
import securityImg from '../assets/images/service_security_1791616629173.jpg';
import renovationImg from '../assets/images/service_renovation_1791616641617.jpg';

// Review work showcase photos
import revPlumbingImg from '../assets/images/review_plumbing_1791616861833.jpg';
import revAcImg from '../assets/images/review_ac_1791616876584.jpg';
import revCarpentryImg from '../assets/images/review_carpentry_1791616891076.jpg';
import revCleaningImg from '../assets/images/review_cleaning_1791616904739.jpg';

export const SERVICES: ServiceItem[] = [
  {
    id: 'plumbing',
    title: 'Plumbing',
    category: 'repairs',
    shortDesc: 'Pipe leak repairs, drain unclogging, tap fittings & emergency water line fixes.',
    fullDesc: 'Comprehensive residential plumbing services by licensed plumbers. From dripping faucets and clogged wastewater drains to full bathroom fixture installations and high-pressure pipe repairs.',
    image: plumbingImg,
    fallbackGradient: 'from-[#023047] to-[#219EBC]',
    startingPrice: 39,
    rating: 4.9,
    reviewsCount: 1420,
    avgTime: '45-90 mins',
    warrantyDays: 30,
    highlights: ['Leak diagnostic test', 'Zero hidden charges', 'Certified fittings used', 'Emergency response'],
    packages: [
      {
        id: 'plumb-leak',
        name: 'Tap & Pipe Leak Fix',
        description: 'Inspection and repair of up to 2 leaking faucets, pipe joints, or valves.',
        price: 39,
        duration: '45 mins',
        popular: true,
        features: ['Up to 2 tap or valve repairs', 'Sealant & washer replacement', 'Water pressure test', '30-day warranty']
      },
      {
        id: 'plumb-drain',
        name: 'Deep Drain Unclogging',
        description: 'Heavy blockage clearing for kitchen sinks, shower traps, or main drains.',
        price: 59,
        duration: '60 mins',
        features: ['Snake motorized drain clearing', 'Debris removal & flush', 'Odor neutralization', 'Eco-friendly safe drain treatment']
      },
      {
        id: 'plumb-fixture',
        name: 'Sanitary Fixture Installation',
        description: 'Professional setup of new sinks, mixers, shower heads, or toilet flush tanks.',
        price: 79,
        duration: '90 mins',
        features: ['Old fixture unmounting', 'Precision leveling & alignment', 'Leak-proof silicone sealant', 'Operational test']
      },
      {
        id: 'plumb-emergency',
        name: 'Urgent Main Line Repair',
        description: 'Immediate priority callout for burst water mains or sewer backup.',
        price: 119,
        duration: '120 mins',
        features: ['Priority 45-min arrival', 'Main supply isolation', 'High-strength pipe coupling', 'Full pressure audit']
      }
    ],
    included: ['Labor charges and basic consumables (tape, washers)', 'Site cleanup after service', 'Standard 30-day service guarantee'],
    excluded: ['Major spare parts (new faucets, motorized pumps, pipes exceeding 3ft)']
  },
  {
    id: 'electrician',
    title: 'Electrician',
    category: 'repairs',
    shortDesc: 'Short-circuit fixes, switchboard wiring, fan & light fixture installations.',
    fullDesc: 'Safety-certified master electricians ready for all domestic electrical needs. We resolve tripped MCBs, install designer chandeliers, repair power sockets, and rewire electrical panels with safety compliance.',
    image: electricianImg,
    fallbackGradient: 'from-[#023047] to-[#219EBC]',
    startingPrice: 35,
    rating: 4.85,
    reviewsCount: 1890,
    avgTime: '30-60 mins',
    warrantyDays: 30,
    highlights: ['Certified safety gear', 'Digital multimeter diagnosis', 'Fire-safe conduit wiring', 'Fast power restoration'],
    packages: [
      {
        id: 'elec-switch',
        name: 'Switch & Socket Repair',
        description: 'Repair or replace faulty electrical switches, 16A power sockets, or dimmers.',
        price: 35,
        duration: '30 mins',
        popular: true,
        features: ['Up to 3 switches/sockets', 'Earthing check', 'Spike guard inspection', 'Fire-safe terminal connections']
      },
      {
        id: 'elec-lights',
        name: 'Light & Fan Fitting',
        description: 'Ceiling fan, chandelier, track lights, or LED panel installation.',
        price: 49,
        duration: '45 mins',
        features: ['Secure anchor mounting', 'Speed regulator connection', 'Balance & vibration dampening', 'Remote pairing if needed']
      },
      {
        id: 'elec-mcb',
        name: 'MCB & Fuse Box Diagnostic',
        description: 'Troubleshooting frequent tripping, breaker burning, or phase failure.',
        price: 69,
        duration: '60 mins',
        features: ['Distribution board inspection', 'Breaker amperage rating audit', 'Loose contact retorquing', 'Voltage stabilization test']
      },
      {
        id: 'elec-rewire',
        name: 'Full Room Rewiring & Concealing',
        description: 'Concealed copper wiring with conduit pipes for renovated rooms.',
        price: 139,
        duration: '180 mins',
        features: ['Flame-retardant grade wires', 'Wall groove cutting & patching', 'Circuit separation for heavy loads', 'Full earthing audit']
      }
    ],
    included: ['Electrician labor & safety testing', 'Digital multimeter load check', 'Clean-up of wire clippings'],
    excluded: ['Cost of new MCBs, designer lamps, or additional copper cables']
  },
  {
    id: 'carpentry',
    title: 'Carpentry',
    category: 'renovation',
    shortDesc: 'Custom furniture repair, door lock fixes, hinge alignment & cabinet woodwork.',
    fullDesc: 'Skilled woodwork artisans for modern and vintage homes. Whether your doors are jamming, hinges squeaking, drawer channels broken, or you need bespoke shelving and wardrobe modifications, our carpenters deliver perfection.',
    image: carpentryImg,
    fallbackGradient: 'from-[#023047] to-[#219EBC]',
    startingPrice: 45,
    rating: 4.9,
    reviewsCount: 960,
    avgTime: '60-120 mins',
    warrantyDays: 30,
    highlights: ['Precision leveling', 'Anti-warp wood solutions', 'Premium soft-close fittings', 'Dust-controlled sanding'],
    packages: [
      {
        id: 'carp-door',
        name: 'Door & Lock Alignment',
        description: 'Fix sticking doors, loose hinges, deadbolt alignment, and handle repairs.',
        price: 45,
        duration: '45 mins',
        popular: true,
        features: ['Up to 2 interior/exterior doors', 'Hinge mortise adjustment', 'Lock striker realignment', 'Wood planing to prevent drag']
      },
      {
        id: 'carp-cabinet',
        name: 'Cabinet & Drawer Restoration',
        description: 'Repair modular kitchen drawer runners, hydraulic hinges, and cabinet shelves.',
        price: 65,
        duration: '75 mins',
        features: ['Telescopic channel fixing', 'Soft-close hinge adjustment', 'Handle & knob tightening', 'Load-bearing shelf reinforcement']
      },
      {
        id: 'carp-furn',
        name: 'Furniture Assembly & Repair',
        description: 'Assembly of flat-pack furniture (IKEA/Wayfair) or reinforcing creaking beds & tables.',
        price: 79,
        duration: '90 mins',
        features: ['Complete structural assembly', 'Corner bracket reinforcement', 'Wood glue & dowel repairs', 'Felt pad installation']
      },
      {
        id: 'carp-custom',
        name: 'Custom Shelving & Molding',
        description: 'Bespoke floating shelves, baseboard moldings, or crown trims.',
        price: 129,
        duration: '150 mins',
        features: ['Laser wall measuring', 'Wall stud anchoring', 'Seamless edge band finish', 'Heavy duty weight rating']
      }
    ],
    included: ['Expert carpentry craftsmanship', 'Specialized wood cutting and planing tools', 'Standard screws and basic adhesives'],
    excluded: ['Specialty replacement locks, branded hardware pulls, raw timber lumber']
  },
  {
    id: 'painting',
    title: 'Painting',
    category: 'renovation',
    shortDesc: 'Interior wall painting, accent walls, damp patch treatment & waterproof primer.',
    fullDesc: 'Transform your living spaces with pristine paint jobs. Our painters use odorless, low-VOC washable paints, meticulous surface masking, putty smoothing, and dual-coat roller application for flawless walls.',
    image: paintingImg,
    fallbackGradient: 'from-[#023047] to-[#219EBC]',
    startingPrice: 89,
    rating: 4.88,
    reviewsCount: 1120,
    avgTime: '1-2 days',
    warrantyDays: 90,
    highlights: ['Laser measurement estimate', 'Floor & furniture masking', 'Odorless low-VOC paints', 'Smooth putty finishing'],
    packages: [
      {
        id: 'paint-patch',
        name: 'Single Wall / Touch-up Fix',
        description: 'Damp treatment, crack filling, putty smoothening, and 2-coat painting for 1 wall.',
        price: 89,
        duration: '3 hours',
        popular: true,
        features: ['Wall surface scraping & crack filler', 'Acrylic putty primer coat', '2 coats of premium emulsion', 'Full furniture masking']
      },
      {
        id: 'paint-room',
        name: 'Full Room Repainting (12x12)',
        description: 'Complete ceiling and 4 walls refresh with premium washable matte or satin finish.',
        price: 189,
        duration: '1 day',
        features: ['Ceiling & all 4 walls', 'Color consultation swatch test', 'Deep masking of switches & skirting', 'Zero spill floor protection']
      },
      {
        id: 'paint-waterproof',
        name: 'Waterproof Primer & Anti-Fungal',
        description: 'Specialized treatment for peeling walls, moisture seepage, and bathroom ceilings.',
        price: 149,
        duration: '5 hours',
        features: ['Efflorescence salt removal', 'Silicone water-repellent primer', 'Anti-fungal microbial coat', '90-day anti-peel warranty']
      },
      {
        id: 'paint-fullhome',
        name: 'Complete Home Transformation',
        description: 'Multi-room full interior repaint with texture accents and designer consultation.',
        price: 499,
        duration: '2-3 days',
        features: ['Up to 3 bedrooms + living area', 'Designer accent wall included', 'Daily site progress supervisor', 'Post-paint deep floor scrubbing']
      }
    ],
    included: ['Drop cloth covering and tape masking', 'Labor & application tools (rollers, trays, ladders)', 'Final site cleanup'],
    excluded: ['Paint material cost (billed transparently at wholesale dealer rates or supplied by owner)']
  },
  {
    id: 'cleaning',
    title: 'Cleaning',
    category: 'cleaning',
    shortDesc: 'Deep home cleaning, kitchen degreasing, bathroom descaling & sofa shampoo.',
    fullDesc: 'Hospital-grade cleanliness for your home. We use industrial vacuum cleaners, single-disc floor scrubbers, eco-friendly descalers, and sanitizers to eliminate grime, grease, and allergens.',
    image: cleaningImg,
    fallbackGradient: 'from-[#023047] to-[#219EBC]',
    startingPrice: 49,
    rating: 4.92,
    reviewsCount: 2450,
    avgTime: '2-4 hours',
    warrantyDays: 7,
    highlights: ['Eco-friendly certified chemicals', 'Industrial vacuum extraction', 'Grout & scale removal', 'Sanitized touchpoints'],
    packages: [
      {
        id: 'clean-bath',
        name: 'Bathroom Intensive Scrub',
        description: 'Hard water stain removal, tile grout scrub, toilet descaling & mirror polishing.',
        price: 49,
        duration: '90 mins',
        popular: true,
        features: ['Acid-free ceramic tile scrub', 'Shower glass limescale removal', 'Drain siphon disinfection', 'Chrome tap buffing']
      },
      {
        id: 'clean-kitchen',
        name: 'Kitchen Degrease & Sanitization',
        description: 'Chimney surface degreasing, cooktop scrub, cabinet exterior wipes, and sink polish.',
        price: 69,
        duration: '2 hours',
        features: ['Oil & grease chemical dissolution', 'Under-counter floor scrub', 'Cabinet exterior & handle sanitizing', 'Exhaust fan blade cleaning']
      },
      {
        id: 'clean-sofa',
        name: 'Sofa & Mattress Deep Shampoo',
        description: 'Extraction cleaning removing dust mites, pet hair, and beverage stains.',
        price: 79,
        duration: '90 mins',
        features: ['Dry vacuum dust extraction', 'Foam shampoo scrubbing', 'Wet vacuum extraction', 'Fabric freshener spray']
      },
      {
        id: 'clean-fullhome',
        name: 'Full Home Deep Cleaning',
        description: 'Total home deep scrub covering all rooms, windows, balconies, floors, and doors.',
        price: 159,
        duration: '4-5 hours',
        features: ['2-3 cleaner dedicated crew', 'Window tracks & glass panes', 'Machine floor buffing', 'Germicidal fogging']
      }
    ],
    included: ['All professional chemicals and machinery', 'Drying blowers where necessary', 'Staff safety PPE'],
    excluded: ['Interior wardrobe organization', 'Exterior facade window washing on high floors']
  },
  {
    id: 'ac-appliances',
    title: 'AC & Appliances',
    category: 'repairs',
    shortDesc: 'AC jet cleaning, gas refill, refrigerator, washing machine & microwave repair.',
    fullDesc: 'Keep your vital home appliances running at peak performance. Our factory-trained technicians diagnose cooling issues, replace faulty capacitors, refill refrigerant, and fix motor errors for all major brands.',
    image: acImg,
    fallbackGradient: 'from-[#023047] to-[#219EBC]',
    startingPrice: 42,
    rating: 4.89,
    reviewsCount: 1670,
    avgTime: '45-90 mins',
    warrantyDays: 60,
    highlights: ['High-pressure jet wash', 'Digital manifold gas check', 'Genuine OEM spare parts', 'Instant cooling boost'],
    packages: [
      {
        id: 'ac-foamjet',
        name: 'AC Foam Jet Servicing',
        description: 'Deep foam soak and high-pressure water jet wash for indoor coil and outdoor unit.',
        price: 42,
        duration: '45 mins',
        popular: true,
        features: ['Coil antibac foam treatment', 'Jet wash drain tray & pipe', 'Air filter deep cleaning', 'Current & cooling temp test']
      },
      {
        id: 'ac-gas',
        name: 'Gas Leak Check & Top-up',
        description: 'Nitrogen leak test, vacuuming, and precise refrigerant refill (R32 / R410A).',
        price: 69,
        duration: '60 mins',
        features: ['Soap bubble & nitrogen leak test', 'Flaring nut tightening', 'Vacuum moisture purge', 'Weighed refrigerant refill']
      },
      {
        id: 'app-washing',
        name: 'Washing Machine Repair',
        description: 'Drum vibration, drainage failure, water inlet valve, or PCB error fix.',
        price: 55,
        duration: '60 mins',
        features: ['Error code diagnostics', 'Pump filter de-clogging', 'Motor belt & suspension check', 'Spin cycle balancing']
      },
      {
        id: 'app-fridge',
        name: 'Refrigerator Diagnostic & Fix',
        description: 'Compressor check, cooling coil defrosting, thermostat, and door gasket seal fix.',
        price: 59,
        duration: '60 mins',
        features: ['Thermal sensor test', 'Defrost heater & timer audit', 'Condenser coil dust blow', 'Compressor relay check']
      }
    ],
    included: ['Technician diagnosis and basic service labor', 'Jet wash equipment and testing meters', '60-day repair guarantee'],
    excluded: ['Cost of compressor, circuit PCB boards, or replacement motors']
  },
  {
    id: 'labour-masonry',
    title: 'Labour & Masonry',
    category: 'heavy',
    shortDesc: 'Tile chipping & relaying, brick wall repair, plastering, and helper labour.',
    fullDesc: 'Heavy-duty construction, masonry repairs, and general site labour. From replacing cracked bathroom floor tiles and repairing boundary walls to plastering cracks and on-demand daily helper labour.',
    image: masonryImg,
    fallbackGradient: 'from-[#023047] to-[#FB8500]',
    startingPrice: 55,
    rating: 4.82,
    reviewsCount: 780,
    avgTime: '2-4 hours',
    warrantyDays: 30,
    highlights: ['Skilled master masons', 'Precise laser leveling', 'Heavy rubble debris clearing', 'Cement & polymer mortar'],
    packages: [
      {
        id: 'mason-tile',
        name: 'Tile Replacement & Regrouting',
        description: 'Chipping cracked tiles, leveling substrate, and relaying with epoxy grout.',
        price: 55,
        duration: '90 mins',
        popular: true,
        features: ['Up to 4 tiles replaced', 'Old adhesive scraping', 'High-bond tile mortar', 'Waterproof grout seal']
      },
      {
        id: 'mason-plaster',
        name: 'Wall Plaster & Patch Repair',
        description: 'Chipping hollow wall plaster, applying sand-cement mix, and smooth float finish.',
        price: 75,
        duration: '2 hours',
        features: ['Hollow spot chiseling', 'Bonding agent bonding slurry', '2-coat plaster mortar', 'Sponge float smooth finish']
      },
      {
        id: 'mason-helper',
        name: 'On-Demand Helper Labour (Half Day)',
        description: 'Physical helper for material shifting, debris loading, garden digging, or heavy lifting.',
        price: 49,
        duration: '4 hours',
        features: ['Physically fit helper', 'Heavy lifting assistance', 'Demolition debris bagging', 'Yard cleanup']
      },
      {
        id: 'mason-brick',
        name: 'Brickwork & Boundary Wall Fix',
        description: 'Structural brick laying, parapet wall repairs, and concrete capping.',
        price: 119,
        duration: '4 hours',
        features: ['Red brick or fly-ash blocks', 'Mortar joint reinforcement', 'Damp-proof course check', 'Level line plumb check']
      }
    ],
    included: ['Master mason / helper labor', 'Basic trowels, chisels, spirit levels', 'Site area sweeping'],
    excluded: ['Bulk materials (sand trucks, cement bags, new ceramic tiles)']
  },
  {
    id: 'pest-control',
    title: 'Pest Control',
    category: 'cleaning',
    shortDesc: 'Cockroach gel treatment, termite eradication, bed bug heat fix & mosquito fogging.',
    fullDesc: 'Guaranteed pest-free living without harsh fumes. We utilize odorless synthetic pyrethroids, micro-gel baiting, and targeted perimeter sprays to eliminate roaches, bedbugs, termites, and rodents safely for kids and pets.',
    image: pestImg,
    fallbackGradient: 'from-[#023047] to-[#219EBC]',
    startingPrice: 38,
    rating: 4.87,
    reviewsCount: 1340,
    avgTime: '45-90 mins',
    warrantyDays: 90,
    highlights: ['Odorless Bayer chemicals', 'Pet & child safe formula', 'No cabinet emptying required', '90-day free re-treatment'],
    packages: [
      {
        id: 'pest-roach',
        name: 'Cockroach & Ant Gel Treatment',
        description: 'Targeted dot-gel application in hinges, under sink, plus crack spray.',
        price: 38,
        duration: '45 mins',
        popular: true,
        features: ['100% odorless gel dots', 'No need to remove utensils', 'Hinges and motor heat zones covered', '90-day eradication guarantee']
      },
      {
        id: 'pest-bedbug',
        name: 'Bed Bug Eradication (2 Visits)',
        description: 'Deep crevice chemical treatment + second cycle visit 12 days later to break egg cycle.',
        price: 85,
        duration: '60 mins',
        features: ['Mattress seam inspection', 'High-temperature steam assist', 'Follow-up visit included', 'Full eradication certificate']
      },
      {
        id: 'pest-termite',
        name: 'Drill-Fill-Seal Termite Barrier',
        description: 'Drilling floor joints, injecting anti-termite emulsion, and color-matching hole sealing.',
        price: 129,
        duration: '2 hours',
        features: ['1-meter interval chemical injection', 'Woodwork perimeter barrier', 'White-cement hole patch', '1-year warranty certificate']
      },
      {
        id: 'pest-rodent',
        name: 'Rodent Baiting & Entry Sealing',
        description: 'Tamper-resistant bait stations, sticky pads, and wire-mesh entry point blocking.',
        price: 59,
        duration: '60 mins',
        features: ['Entry point inspection', 'Tamper-evident bait stations', 'Ceiling trap placement', 'Free 15-day inspection']
      }
    ],
    included: ['Certified pest-control chemicals and sprayers', 'Full safety PPE', 'Free re-service if pests reappear within warranty'],
    excluded: ['Replacement of pre-damaged woodwork']
  },
  {
    id: 'gardening',
    title: 'Gardening',
    category: 'outdoor',
    shortDesc: 'Lawn mowing, hedge trimming, plant repotting, organic fertilizing & drip setup.',
    fullDesc: 'Revitalize your outdoor lawn, terrace pots, or indoor greenery. Our horticulturists and gardeners prune overgrown trees, treat plant diseases, repot root-bound plants with enriched potting mix, and setup micro-irrigation.',
    image: gardeningImg,
    fallbackGradient: 'from-[#023047] to-[#219EBC]',
    startingPrice: 39,
    rating: 4.93,
    reviewsCount: 890,
    avgTime: '2-3 hours',
    warrantyDays: 14,
    highlights: ['Lawn aerator & mower', 'Organic vermicompost', 'Pest disease diagnosis', 'Terrace & balcony styling'],
    packages: [
      {
        id: 'gard-mow',
        name: 'Lawn Mowing & Hedge Trim',
        description: 'Mowing grass up to 1000 sq ft, perimeter edging, and hedge bush shaping.',
        price: 49,
        duration: '90 mins',
        popular: true,
        features: ['Motorized lawn mower cut', 'Crisp border trimming', 'Hedge pruning & topiary shape', 'Grass clippings collection']
      },
      {
        id: 'gard-repot',
        name: 'Plant Repotting & Soil Enriched (10 Pots)',
        description: 'Root aeration, soil replacement with coco-peat & vermicompost mix for 10 pots.',
        price: 39,
        duration: '75 mins',
        features: ['Up to 10 potted plants', 'Root pruning & repotting', 'Nutrient enriched organic mix', 'Leaf shining & spray']
      },
      {
        id: 'gard-health',
        name: 'Plant Doctor & Organic Pest Cure',
        description: 'Treatment for yellowing leaves, mealybugs, fungal mildew, and nutrient deficiencies.',
        price: 59,
        duration: '60 mins',
        features: ['Neem oil bio-spray application', 'Micronutrient soil drench', 'Pruning infected foliage', 'Care guide schedule']
      },
      {
        id: 'gard-drip',
        name: 'Balcony Drip Irrigation Setup',
        description: 'Installation of automated drip pipe line with drippers for up to 25 pots.',
        price: 119,
        duration: '2 hours',
        features: ['Flexible 4mm UV drip tubing', 'Adjustable drip emitters', 'Tap connector with filter', 'Battery timer setup demo']
      }
    ],
    included: ['Gardener labor and precision shears/mowers', 'Bagging of green yard waste', 'Basic organic fertilizer boost'],
    excluded: ['New ceramic planters, exotic imported plants, digital timer hardware']
  },
  {
    id: 'shifting',
    title: 'Shifting',
    category: 'heavy',
    shortDesc: 'House shifting, furniture disassembly, bubble wrapping & local relocation.',
    fullDesc: 'Stress-free packers and movers for local city shifting. Our crew provides multi-layer bubble wrapping for fragile electronics, protective blankets for furniture, secure loading, and doorstep reassembly.',
    image: shiftingImg,
    fallbackGradient: 'from-[#023047] to-[#FB8500]',
    startingPrice: 99,
    rating: 4.86,
    reviewsCount: 1540,
    avgTime: '3-6 hours',
    warrantyDays: 14,
    highlights: ['5-layer bubble packaging', 'Heavy vehicle dispatch', 'Furniture disassembly & refit', 'Transit damage cover'],
    packages: [
      {
        id: 'shift-single',
        name: '1 BHK / Mini Shifting (Local)',
        description: 'Dedicated mini-truck, 2 trained loaders, wrapping for major appliances.',
        price: 99,
        duration: '3 hours',
        popular: true,
        features: ['Bed & sofa wrapping', 'TV and fridge protective padding', 'Ground-to-ground loading', 'Transit insurance option']
      },
      {
        id: 'shift-family',
        name: '2-3 BHK Full Household Move',
        description: 'Large covered container truck, 4 skilled packers, complete box packing.',
        price: 199,
        duration: '5 hours',
        features: ['4-man packing crew', 'Full kitchen crockery crating', 'Furniture dismantle and re-assembly', 'Floor protection runners']
      },
      {
        id: 'shift-items',
        name: 'Single Heavy Item Shifting',
        description: 'Safe moving of a piano, large double-door fridge, treadmill, or king wardrobe.',
        price: 69,
        duration: '90 mins',
        features: ['Heavy lifting straps & dollies', 'Multi-layer padded blankets', 'Careful stair navigation', 'Doorstep positioning']
      },
      {
        id: 'shift-box',
        name: 'Packing Material & Pre-Pack Crew',
        description: 'Supply of 20 corrugated boxes, bubble rolls, tape + 2 packers for 3 hours.',
        price: 89,
        duration: '3 hours',
        features: ['20 heavy-duty double wall boxes', '100m bubble wrap + tape', 'Labeling by room', 'Zero lifting required by owner']
      }
    ],
    included: ['Experienced packing personnel', 'Dollies, ramps, and tie-down ratchets', 'Toll taxes and driver fees'],
    excluded: ['Interstate permit fees, elevator technician if balcony hoisting is needed']
  },
  {
    id: 'home-security',
    title: 'Home Security',
    category: 'repairs',
    shortDesc: 'CCTV camera installation, smart door locks, video doorbells & security audit.',
    fullDesc: 'Protect what matters most with smart home security installations. We install IP CCTV cameras with night vision, setup smart biometric deadbolt locks, integrate video doorbells, and configure real-time mobile app alerts.',
    image: securityImg,
    fallbackGradient: 'from-[#023047] to-[#219EBC]',
    startingPrice: 49,
    rating: 4.91,
    reviewsCount: 650,
    avgTime: '60-120 mins',
    warrantyDays: 60,
    highlights: ['Concealed cabling', 'Mobile remote view pairing', 'Biometric lock calibration', 'Cloud storage setup'],
    packages: [
      {
        id: 'sec-cam',
        name: 'CCTV Camera Setup (Up to 2 Cams)',
        description: 'Mounting, cabling, Wi-Fi pairing, angle calibration, and phone app setup.',
        price: 49,
        duration: '60 mins',
        popular: true,
        features: ['Precision outdoor/indoor wall mounting', 'Power cable routing', 'MicroSD or NVR connection', 'Motion detection zone setup']
      },
      {
        id: 'sec-lock',
        name: 'Smart Biometric Door Lock Install',
        description: 'Mortise lock installation on wooden or metal doors, fingerprint & PIN programming.',
        price: 79,
        duration: '90 mins',
        features: ['Door hole drilling & mortise fitting', 'Sensor alignment', 'Fingerprint & passcode registration', 'Emergency key override test']
      },
      {
        id: 'sec-bell',
        name: 'Smart Video Doorbell Fitting',
        description: 'Chime wiring, chime box bypass, angle wedge installation, and Wi-Fi streaming.',
        price: 45,
        duration: '45 mins',
        features: ['Low-voltage transformer check', 'Optimal viewing angle mount', 'Smartphone push notification test', 'Two-way talk audio test']
      },
      {
        id: 'sec-full',
        name: 'Whole Home Security Audit & 4-Cam Kit',
        description: 'Full 4-channel camera wiring, NVR recording station, and perimeter vulnerability test.',
        price: 159,
        duration: '3 hours',
        features: ['Up to 4 cameras mounted & piped', 'Central NVR hard drive configuration', 'Blind spot assessment', '3-month tech support']
      }
    ],
    included: ['Technician mounting & network integration', 'Conduit clip wiring', 'Demonstration & customer training'],
    excluded: ['Cost of cameras, smart lock hardware, or hard drives']
  },
  {
    id: 'home-renovation',
    title: 'Home Renovation',
    category: 'renovation',
    shortDesc: 'Kitchen remodeling, bathroom makeover, false ceiling, and full interior upgrade.',
    fullDesc: 'End-to-end residential renovation and remodeling. From modern modular kitchens with quartz countertops and luxury spa bathrooms to acoustic gypsum false ceilings and turnkey interior transformations.',
    image: renovationImg,
    fallbackGradient: 'from-[#023047] to-[#FFB703]',
    startingPrice: 199,
    rating: 4.95,
    reviewsCount: 840,
    avgTime: 'Custom schedule',
    warrantyDays: 365,
    highlights: ['Free 3D layout consultation', 'Dedicated project manager', 'Milestone-based progress', '1-year structural warranty'],
    packages: [
      {
        id: 'reno-bath',
        name: 'Bathroom Refresh & Vanity Upgrade',
        description: 'New tile overlay, concealed shower diverter, floating vanity & frameless glass partition.',
        price: 299,
        duration: '3-5 days',
        popular: true,
        features: ['Demolition & substrate waterproofing', 'Plumbing line realignment', 'Designer sanitary fittings installation', 'Anti-fog LED mirror wiring']
      },
      {
        id: 'reno-kitchen',
        name: 'Modular Kitchen Remodel',
        description: 'Granite/Quartz countertop, marine-ply cabinets, soft-close baskets, and chimney ducting.',
        price: 499,
        duration: '5-7 days',
        features: ['Custom carcass cabinetry', 'Hydraulic lift-up wall units', 'Under-cabinet warm strip lights', 'Sink & gas hob plumbing setup']
      },
      {
        id: 'reno-ceiling',
        name: 'False Ceiling & Cove Lighting (1 Room)',
        description: 'Gypsum board ceiling with perimeter cove lighting channels and spotlight cutouts.',
        price: 199,
        duration: '2 days',
        features: ['Galvanized steel channel grid', 'Moisture-resistant gypsum panels', 'POP joint compound taping', 'Precision spotlight cutouts']
      },
      {
        id: 'reno-turnkey',
        name: 'Turnkey Apartment Renovation Consultation',
        description: 'Detailed site inspection, 3D render proposal, bill of quantities (BOQ), and project plan.',
        price: 49,
        duration: '90 mins',
        features: ['Architect / interior lead site visit', 'Complete structural assessment', '3D design plan & itemized estimate', 'Consultation fee waived if booked']
      }
    ],
    included: ['Architectural site supervision', 'All demolition tool machinery', '1-year structural workmanship warranty'],
    excluded: ['Raw material tiles, sanitary fixtures, appliances (custom specified per owner taste)']
  }
];

export const TOP_PROS: Professional[] = [
  {
    id: 'pro-1',
    name: 'David Rodriguez',
    specialty: 'Master Plumber',
    experience: '12 years',
    rating: 4.95,
    completedJobs: 1420,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    badge: 'HS Gold Master',
    verified: true,
    ratePerHour: 45,
    bio: 'Licensed plumbing contractor specializing in pipe leak detection, bathroom remodel plumbing, and high-pressure jet rodding.'
  },
  {
    id: 'pro-2',
    name: 'Elena Rostova',
    specialty: 'Licensed Electrical Specialist',
    experience: '9 years',
    rating: 4.92,
    completedJobs: 980,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    badge: 'Safety Certified',
    verified: true,
    ratePerHour: 48,
    bio: 'Certified master electrician with a focus on smart home automation, panel upgrades, and commercial-grade home wiring safety.'
  },
  {
    id: 'pro-3',
    name: 'Marcus Chen',
    specialty: 'HVAC & Appliance Technician',
    experience: '8 years',
    rating: 4.89,
    completedJobs: 1140,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    badge: 'Top Rated Pro',
    verified: true,
    ratePerHour: 42,
    bio: 'Certified HVAC engineer. Specializes in multi-split air conditioners, refrigerator compressors, and energy-saving setups.'
  },
  {
    id: 'pro-4',
    name: 'James Wilson',
    specialty: 'Master Carpenter & Joiner',
    experience: '15 years',
    rating: 4.98,
    completedJobs: 1850,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    badge: 'Craftsman Elite',
    verified: true,
    ratePerHour: 52,
    bio: 'Artisan woodworker dedicated to custom cabinetry, door installations, timber restoration, and precision architectural trims.'
  }
];

export const REVIEWS: (CustomerReview & { projectImage?: string })[] = [
  {
    id: 'rev-1',
    author: 'Sarah Jenkins',
    city: 'Austin, TX',
    service: 'Plumbing (Tap & Pipe Leak Fix)',
    rating: 5,
    date: '3 days ago',
    comment: 'Plumber David arrived right on time with all tools. He fixed a persistent leak under our kitchen sink in 35 minutes and even inspected our water heater for free. Outstanding service!',
    verified: true,
    projectImage: revPlumbingImg
  },
  {
    id: 'rev-2',
    author: 'Michael Bradley',
    city: 'Seattle, WA',
    service: 'AC & Appliances (Foam Jet Servicing)',
    rating: 5,
    date: '1 week ago',
    comment: 'Our dual AC units were barely cooling. Marcus performed the foam jet wash and gas pressure check. The cooling difference was instantaneous! Upfront price with zero surprises.',
    verified: true,
    projectImage: revAcImg
  },
  {
    id: 'rev-3',
    author: 'Amina Patel',
    city: 'San Francisco, CA',
    service: 'Carpentry (Door & Lock Alignment)',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Had 3 doors that were jamming against the hardwood floor. James planed them smoothly, oiled the hinges, and aligned the deadbolts. So clean and courteous!',
    verified: true,
    projectImage: revCarpentryImg
  },
  {
    id: 'rev-4',
    author: 'Robert Vance',
    city: 'Denver, CO',
    service: 'Cleaning (Full Home Deep Cleaning)',
    rating: 5,
    date: '3 weeks ago',
    comment: 'The team spent 5 hours scrubbing every nook and cranny before our move-in. The kitchen tiles and shower glass look like brand new. HS.com is now my go-to service platform.',
    verified: true,
    projectImage: revCleaningImg
  }
];

export const CITIES = [
  'Austin, TX',
  'Seattle, WA',
  'San Francisco, CA',
  'Denver, CO',
  'Chicago, IL',
  'New York, NY',
  'Dallas, TX',
  'Atlanta, GA'
];
