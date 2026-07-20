/**
 * Human Anatomy App - Medical Database & Hierarchy
 * Sourced from reliable, open-source biomedical & anatomical references (NIH, OpenStax Anatomy & Physiology).
 */

const ANATOMY_DATABASE = {
  // Systems and their hierarchical structures
  hierarchy: {
    skeletal: {
      name: "Skeletal System",
      icon: "🦴",
      color: "#e2e8f0",
      description: "The internal framework of the body, composed of bones and cartilage, providing structure, protection, and facilitating movement.",
      children: {
        skull: {
          name: "Skull (Cranium)",
          description: "The bony structure that forms the head, supporting the structures of the face and protecting the brain.",
          children: {
            cranium: {
              name: "Cranial Vault",
              description: "The upper portion of the skull enclosing and protecting the cerebral hemispheres.",
              children: {
                occipital_bone: {
                  name: "Occipital Bone",
                  description: "The trapezoidal bone situated at the lower-back part of the cranium, housing the foramen magnum (connector to spinal cord)."
                },
                frontal_bone: {
                  name: "Frontal Bone",
                  description: "The bone that forms the forehead, protecting the frontal lobes of the brain."
                }
              }
            },
            mandible: {
              name: "Mandible (Jawbone)",
              description: "The strongest, lowest, and largest bone in the human skull, forming the lower jaw and holding the lower teeth."
            }
          }
        },
        spine: {
          name: "Vertebral Column (Spine)",
          description: "The central axis of the skeleton, consisting of a flexible column of vertebrae protecting the spinal cord.",
          children: {
            cervical: {
              name: "Cervical Vertebrae",
              description: "The upper 7 vertebrae of the spine (C1-C7) supporting the head and allowing neck rotation.",
              children: {
                atlas_vertebra: {
                  name: "Atlas (C1)",
                  description: "The first cervical vertebra, supporting the skull and enabling nodding motions."
                },
                axis_vertebra: {
                  name: "Axis (C2)",
                  description: "The second cervical vertebra, serving as the pivot point around which the atlas and head rotate."
                }
              }
            },
            thoracic: {
              name: "Thoracic Vertebrae",
              description: "The 12 middle vertebrae (T1-T12) providing attachments for the ribs."
            },
            lumbar: {
              name: "Lumbar Vertebrae",
              description: "The 5 lower vertebrae (L1-L5) bearing the main weight of the upper body."
            },
            sacrum: {
              name: "Sacrum & Coccyx",
              description: "A triangular bone at the base of the spine, formed by fused vertebrae, terminating in the tailbone (coccyx)."
            }
          }
        },
        ribcage: {
          name: "Ribcage",
          description: "The bony frame formed by the ribs, sternum, and spine, protecting thoracic organs (heart and lungs).",
          children: {
            ribs: {
              name: "Ribs",
              description: "12 pairs of curved bones forming the walls of the thorax.",
              children: {
                costal_cartilage: {
                  name: "Costal Cartilage",
                  description: "Bars of hyaline cartilage connecting ribs to the sternum, providing elasticity for breathing."
                }
              }
            },
            sternum: {
              name: "Sternum (Breastbone)",
              description: "The flat bone in the center of the chest connecting to the rib cartilage.",
              children: {
                xiphoid_process: {
                  name: "Xiphoid Process",
                  description: "The small cartilaginous extension at the lower part of the sternum."
                }
              }
            }
          }
        },
        pelvis: {
          name: "Pelvis",
          description: "The basin-shaped complex of bones connecting the trunk and legs, supporting abdominal organs. Sexually dimorphic: wider in females to facilitate childbirth.",
          children: {
            ilium: { name: "Ilium", description: "The uppermost and largest part of the pelvic bone." },
            ischium: { name: "Ischium", description: "The lower-back part of the pelvis, forming the sit-bones." },
            pubis: { name: "Pubic Bone", description: "The forward portion of the pelvis forming the pubic symphysis." }
          }
        },
        limbs: {
          name: "Limb Bones",
          description: "The structural bones of the upper and lower extremities facilitating mechanical locomotion.",
          children: {
            humerus: { name: "Humerus", description: "The long bone of the upper arm, extending from shoulder to elbow." },
            radius_ulna: { name: "Radius & Ulna", description: "The parallel bones of the forearm, rotating to facilitate wrist pronation." },
            femur: {
              name: "Femur (Thighbone)",
              description: "The longest, heaviest, and strongest bone in the human body.",
              children: {
                patella: { name: "Patella (Kneecap)", description: "The thick, circular-triangular bone protecting the knee joint." }
              }
            },
            tibia_fibula: { name: "Tibia & Fibula", description: "The bones of the lower leg; tibia is the main weight-bearing shin bone." }
          }
        }
      }
    },
    cardiovascular: {
      name: "Cardiovascular System",
      icon: "❤️",
      color: "#f87171",
      description: "The circulatory system responsible for pumping and routing blood, oxygen, and nutrients throughout the body.",
      children: {
        heart: {
          name: "Heart",
          description: "A muscular organ about the size of a closed fist that pumps blood through the network of arteries and veins.",
          children: {
            chambers: {
              name: "Heart Chambers",
              description: "The four main cavities of the heart structure.",
              children: {
                left_ventricle: {
                  name: "Left Ventricle",
                  description: "The thickest chamber, responsible for pumping oxygenated blood into the aorta for systemic circulation."
                },
                right_ventricle: {
                  name: "Right Ventricle",
                  description: "The chamber that pumps deoxygenated blood into the lungs via the pulmonary artery."
                },
                atria: {
                  name: "Atria (Left & Right)",
                  description: "The upper chambers that receive blood entering the heart (right receives from body, left from lungs)."
                }
              }
            },
            valves: {
              name: "Heart Valves",
              description: "Flap-like structures that prevent backflow of blood.",
              children: {
                mitral_valve: {
                  name: "Mitral Valve",
                  description: "The dual-flap valve between the left atrium and left ventricle."
                }
              }
            },
            myocardium: {
              name: "Myocardium",
              description: "The specialized involuntary muscular tissue of the heart walls, generating contraction pulses."
            },
            coronary_arteries: {
              name: "Coronary Arteries",
              description: "The blood vessels supplying oxygen-rich blood directly to the heart muscle itself."
            }
          }
        },
        arteries: {
          name: "Arteries",
          description: "Elastic, thick-walled vessels conveying oxygenated blood away from the heart to peripheral tissues.",
          children: {
            aorta: {
              name: "Aorta",
              description: "The largest artery in the human body, arising from the left ventricle and distributing blood via systemic loop.",
              children: {
                aortic_arch: {
                  name: "Aortic Arch",
                  description: "The curved portion of the aorta routing blood to upper extremities and head."
                }
              }
            },
            carotid_arteries: {
              name: "Carotid Arteries",
              description: "Major blood vessels in the neck supplying oxygenated blood to the brain, neck, and face."
            },
            femoral_arteries: {
              name: "Femoral Arteries",
              description: "Large arteries in the thighs supplying the lower limbs."
            }
          }
        },
        veins: {
          name: "Veins",
          description: "Flexible vessels returning deoxygenated blood back to the heart, featuring one-way valves.",
          children: {
            vena_cava: {
              name: "Vena Cava",
              description: "The large veins (Superior and Inferior) returning deoxygenated blood from the body to the right atrium."
            },
            jugular_veins: {
              name: "Jugular Veins",
              description: "Veins in the neck returning deoxygenated blood from the brain and face."
            }
          }
        }
      }
    },
    nervous: {
      name: "Nervous System",
      icon: "🧠",
      color: "#38bdf8",
      description: "The master control and communication center, regulating body activities via electrical and chemical signals.",
      children: {
        brain: {
          name: "Brain",
          description: "The central organ of the nervous system, controlling cognitive function, sensory integration, and motor response.",
          children: {
            cerebrum: {
              name: "Cerebrum (Cerebral Cortex)",
              description: "The largest part of the brain, split into two hemispheres, directing higher cognitive processes.",
              children: {
                frontal_lobe: {
                  name: "Frontal Lobe",
                  description: "Associated with decision making, planning, reasoning, voluntary motor control, and speech."
                },
                occipital_lobe: {
                  name: "Occipital Lobe",
                  description: "The visual processing center of the mammalian brain, mapping optical signals."
                }
              }
            },
            cerebellum: {
              name: "Cerebellum",
              description: "The structure at the base of the brain coordinating muscle activity, balance, and posture."
            },
            brainstem: {
              name: "Brainstem",
              description: "The structural connection between cerebrum and spinal cord, regulating cardiac and respiratory functions.",
              children: {
                medulla_oblongata: {
                  name: "Medulla Oblongata",
                  description: "The lower half of the brainstem containing control centers for heartbeat, breathing, and blood pressure."
                }
              }
            }
          }
        },
        spinal_cord: {
          name: "Spinal Cord",
          description: "The long, thin tubular bundle of nervous tissue extending from the brainstem down the spine, conveying reflex loops.",
          children: {
            grey_matter: {
              name: "Grey Matter",
              description: "Central butterfly-shaped region containing neuronal cell bodies and synapses."
            },
            white_matter: {
              name: "White Matter",
              description: "Outer region of the spinal cord composed of myelinated nerve axon tracts conducting impulses up and down."
            }
          }
        },
        peripheral_nerves: {
          name: "Peripheral Nerves",
          description: "Nerve fibers branching out from the central nervous system to organs and extremities.",
          children: {
            sciatic_nerve: {
              name: "Sciatic Nerve",
              description: "The largest single nerve in the body, running from the lower spine down the back of each leg."
            },
            vagus_nerve: {
              name: "Vagus Nerve (CN X)",
              description: "The longest cranial nerve, regulating parasympathetic control of heart, lungs, and digestive tract."
            }
          }
        }
      }
    },
    digestive: {
      name: "Digestive & Visceral Organs",
      icon: "🥗",
      color: "#fbbf24",
      description: "The metabolic engine of the body, absorbing nutrients, filtering blood, and eliminating waste.",
      children: {
        lungs: {
          name: "Lungs (Respiratory)",
          description: "The primary organs of respiration, conducting gas exchange where oxygen is absorbed and carbon dioxide is expelled.",
          children: {
            left_lung: {
              name: "Left Lung (2 Lobes)",
              description: "Divided into superior and inferior lobes, featuring a cardiac notch to accommodate the heart."
            },
            right_lung: {
              name: "Right Lung (3 Lobes)",
              description: "Larger lung divided into superior, middle, and inferior lobes."
            },
            alveoli: {
              name: "Alveoli (Air Sacs)",
              description: "Microscopic balloon-like structures at the end of bronchioles where diffusion of gas occurs."
            }
          }
        },
        stomach: {
          name: "Stomach",
          description: "A hollow muscular organ that mixes and digests food with acid and enzymes before passing it to the intestines.",
          children: {
            fundus: {
              name: "Stomach Fundus",
              description: "The dome-shaped upper section of the stomach storing undigested food and gases."
            },
            pylorus: {
              name: "Pyloric Sphincter",
              description: "The muscular valve regulating the passage of liquefied food (chyme) into the small intestine."
            },
            gastric_mucosa: {
              name: "Gastric Mucosa (Lining)",
              description: "The inner mucous membrane layer containing gastric glands that secrete hydrochloric acid and pepsinogen."
            }
          }
        },
        liver: {
          name: "Liver",
          description: "A large metabolic organ that detoxifies chemicals, metabolizes drugs, synthesizes proteins, and secretes bile.",
          children: {
            hepatic_lobes: {
              name: "Left & Right Lobes",
              description: "The two main anatomical subdivisions of liver parenchyma."
            },
            gallbladder: {
              name: "Gallbladder",
              description: "A small pear-shaped organ beneath the liver storing and concentrating bile for fat digestion."
            },
            hepatocytes: {
              name: "Hepatocytes",
              description: "The primary functional cells of the liver, executing metabolic, endocrine, and secretory functions."
            }
          }
        },
        intestines: {
          name: "Intestines",
          description: "The winding tubular tract absorbing nutrients and water.",
          children: {
            small_intestine: {
              name: "Small Intestine",
              description: "The site where 90% of digestion and nutrient absorption occurs, consisting of duodenum, jejunum, and ileum.",
              children: {
                villi: {
                  name: "Intestinal Villi",
                  description: "Tiny, finger-like projections covering the inner lining, multiplying surface area for absorption."
                }
              }
            },
            large_intestine: {
              name: "Large Intestine (Colon)",
              description: "Absorbs water and electrolytes, processing indigestible material into feces."
            }
          }
        },
        kidneys: {
          name: "Kidneys (Renal)",
          description: "Bean-shaped organs filtering waste, excess water, and impurities from blood to produce urine, regulating blood pressure.",
          children: {
            renal_cortex: {
              name: "Renal Cortex",
              description: "The outer zone of the kidney containing blood-filtering glomeruli."
            },
            nephrons: {
              name: "Nephrons",
              description: "The structural and functional filtration units, numbering approximately 1 million per kidney."
            }
          }
        }
      }
    },
    reproductive: {
      name: "Reproductive System",
      icon: "🧬",
      color: "#ec4899",
      description: "Organs involved in producing offspring, exhibiting distinct anatomical dimorphism between sexes.",
      children: {
        male_reproductive: {
          name: "Male Reproductive System",
          description: "Anatomical structures optimized for hormone synthesis and gamete production.",
          sexSpecific: "male",
          children: {
            testes: {
              name: "Testes",
              description: "Male gonads producing sperm and secreting testosterone."
            },
            prostate: {
              name: "Prostate Gland",
              description: "A walnut-sized gland surrounding the urethra, secreting alkaline seminal fluid."
            }
          }
        },
        female_reproductive: {
          name: "Female Reproductive System",
          description: "Anatomical structures optimized for gamete fertilization, hormone synthesis, and gestational support.",
          sexSpecific: "female",
          children: {
            uterus: {
              name: "Uterus (Womb)",
              description: "A hollow, pear-shaped muscular organ where a fertilized egg implants and develops during pregnancy."
            },
            ovaries: {
              name: "Ovaries",
              description: "Female gonads producing eggs (ova) and secreting estrogen and progesterone."
            }
          }
        }
      }
    },
    skin: {
      name: "Skin (Integumentary)",
      icon: "🩹",
      color: "#fdba74",
      description: "The body's outer covering, forming the barrier that protects internal systems, regulates temperature, and detects sensory inputs.",
      children: {
        epidermis: {
          name: "Epidermis",
          description: "The outermost layer of the skin, providing a waterproof barrier, protecting against pathogens, and determining skin tone."
        },
        dermis: {
          name: "Dermis",
          description: "The thick middle layer of skin containing blood vessels, lymphatic vessels, hair follicles, sweat glands, and sensory receptors."
        },
        subcutaneous: {
          name: "Subcutaneous Tissue",
          description: "The deepest layer (hypodermis) consisting of fat and connective tissue that insulates the body, stores energy, and cushions organs."
        }
      }
    },
    blood: {
      name: "Blood System",
      icon: "🩸",
      color: "#f43f5e",
      description: "The specialized bodily fluid supplying essential substances and nutrients, such as sugar, oxygen, and hormones, and removing metabolic waste.",
      children: {
        red_blood_cells: {
          name: "Red Blood Cells",
          description: "Biconcave disc cells (erythrocytes) packed with hemoglobin that carry oxygen from the lungs to tissues."
        },
        white_blood_cells: {
          name: "White Blood Cells",
          description: "Cells of the immune system (leukocytes) that defend the body against infectious diseases and foreign invaders."
        },
        platelets: {
          name: "Platelets",
          description: "Small cell fragments (thrombocytes) circulating in blood that bind together at vessel injuries to initiate clotting."
        }
      }
    }
  },

  // Flat database index for quick lookups by ID
  flatDatabase: {}
};

const ANATOMY_DETAILS = {
  "skull": {
    "infections": [
      {
        "name": "Cranial Osteomyelitis",
        "desc": "Bone infection of the skull, typically bacterial.",
        "cure": "High-dose intravenous antibiotics and surgical debridement of infected bone."
      },
      {
        "name": "Meningioma",
        "desc": "A tumor, usually benign, arising from the meninges layers covering the brain and skull base.",
        "cure": "Surgical resection or focused radiation therapy."
      },
      {
        "name": "Sinusitis-linked Skull Infection",
        "desc": "Complication where sinus infections spread to frontal skull bones.",
        "cure": "Antibiotics and sinus drainage surgery."
      }
    ],
    "url": "https://medlineplus.gov/skullinjuries.html"
  },
  "cranium": {
    "infections": [
      {
        "name": "Osteomyelitis of Cranium",
        "desc": "Bacterial or fungal infection of the cranial bones, often post-surgery or trauma.",
        "cure": "Intravenous antibiotic therapy and removal of devitalized bone."
      },
      {
        "name": "Osteoma of the Cranium",
        "desc": "A benign slow-growing bone tumor commonly found on the cranium.",
        "cure": "Observation or surgical excision if causing pain or cosmetic issues."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK549811/"
  },
  "occipital_bone": {
    "infections": [
      {
        "name": "Skull Base Osteomyelitis (SBO)",
        "desc": "Rare, life-threatening infection of the occipital/temporal skull base bones.",
        "cure": "Prolonged IV antibiotics (6-12 weeks) and hyperbaric oxygen therapy."
      },
      {
        "name": "Chordoma of Skull Base",
        "desc": "A rare malignant tumor arising from embryonic remnants of the notochord in the occipital/clival region.",
        "cure": "Surgical resection followed by proton beam radiation."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK549801/"
  },
  "frontal_bone": {
    "infections": [
      {
        "name": "Pott's Puffy Tumor",
        "desc": "Osteomyelitis of the frontal bone associated with frontal sinusitis.",
        "cure": "Surgical drainage and long-term intravenous antibiotics."
      },
      {
        "name": "Frontal Bone Osteosarcoma",
        "desc": "Highly malignant primary bone tumor of the frontal cranium.",
        "cure": "Neoadjuvant chemotherapy followed by radical surgical resection."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK535424/"
  },
  "mandible": {
    "infections": [
      {
        "name": "Mandibular Osteomyelitis",
        "desc": "Infection of the jawbone, usually originating from dental infections.",
        "cure": "Antibiotics, root canal, or surgical resection of necrotic bone."
      },
      {
        "name": "Ameloblastoma",
        "desc": "Rare, benign but highly aggressive tumor of odontogenic epithelium in the mandible.",
        "cure": "Wide local surgical resection and jaw reconstruction."
      }
    ],
    "url": "https://medlineplus.gov/jawinjuriesanddisorders.html"
  },
  "spine": {
    "infections": [
      {
        "name": "Vertebral Osteomyelitis",
        "desc": "Infection of the spine bones, often spreading via the bloodstream.",
        "cure": "Intravenous antibiotics, spinal bracing, or surgery for instability."
      },
      {
        "name": "Discitis",
        "desc": "Infection of the intervertebral disc space.",
        "cure": "Bed rest, antibiotics, and pain management."
      },
      {
        "name": "Spinal Cord Glioma",
        "desc": "Intradullary spinal tumor arising from glial cells.",
        "cure": "Surgical resection and radiation/chemotherapy depending on grade."
      }
    ],
    "url": "https://medlineplus.gov/spineinjuriesanddisorders.html"
  },
  "cervical": {
    "infections": [
      {
        "name": "Cervical Osteomyelitis",
        "desc": "Infection in the neck vertebrae, causing severe pain and neurological risk.",
        "cure": "IV antibiotics and cervical collar immobilization."
      },
      {
        "name": "Cervical Chondrosarcoma",
        "desc": "Malignant cartilage-producing tumor of the cervical spine.",
        "cure": "Surgical resection with wide margins; resistant to chemo/radiation."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK531468/"
  },
  "atlas_vertebra": {
    "infections": [
      {
        "name": "Atlantoaxial Joint Infection",
        "desc": "Bacterial infection of the C1-C2 joint space.",
        "cure": "Antibiotic treatment and rigid halo brace immobilization."
      },
      {
        "name": "Atlas Bone Metastasis",
        "desc": "Secondary malignant tumor spreading to the C1 vertebra.",
        "cure": "Radiotherapy, cervical stabilization, and systemic cancer therapy."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK534220/"
  },
  "axis_vertebra": {
    "infections": [
      {
        "name": "Axis Osteomyelitis",
        "desc": "Infection of the C2 vertebra, risking spinal cord compression.",
        "cure": "Intravenous antibiotics, spinal stabilization, or surgical decompression."
      },
      {
        "name": "Axis Aneurysmal Bone Cyst",
        "desc": "Benign but locally destructive osteolytic bone tumor of C2.",
        "cure": "Curettage, bone grafting, and selective arterial embolization."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK534220/"
  },
  "thoracic": {
    "infections": [
      {
        "name": "Spinal Tuberculosis (Pott's Disease)",
        "desc": "Tuberculosis infection of the thoracic vertebrae leading to kyphosis.",
        "cure": "Multi-drug antitubercular regimen and occasionally surgical reconstruction."
      },
      {
        "name": "Thoracic Vertebral Hemangioma",
        "desc": "Benign vascular tumor inside thoracic spinal vertebrae.",
        "cure": "Observation; radiotherapy or vertebroplasty if neurological compression occurs."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK541058/"
  },
  "lumbar": {
    "infections": [
      {
        "name": "Lumbar Epidural Abscess",
        "desc": "Pus collection in the lumbar spinal canal, compression risk.",
        "cure": "Emergency surgical decompression drainage and targeted IV antibiotics."
      },
      {
        "name": "Lumbar Osteosarcoma",
        "desc": "Primary malignant bone tumor of the lumbar vertebrae.",
        "cure": "Neoadjuvant chemotherapy and wide margin spinal resection."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK539894/"
  },
  "sacrum": {
    "infections": [
      {
        "name": "Sacral Osteomyelitis",
        "desc": "Bone infection of the sacrum, commonly from contiguous pressure ulcers.",
        "cure": "Debridement, flap surgery, and long-term antibiotics."
      },
      {
        "name": "Sacral Chordoma",
        "desc": "Malignant bone tumor at the base of the spine, slow-growing but invasive.",
        "cure": "Surgical sacrectomy and proton beam therapy."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK507859/"
  },
  "ribcage": {
    "infections": [
      {
        "name": "Rib Osteomyelitis",
        "desc": "Bacterial infection of the ribs, often after chest wall trauma.",
        "cure": "Surgical resection of infected rib segments and antibiotics."
      },
      {
        "name": "Chest Wall Chondrosarcoma",
        "desc": "Malignant cartilage tumor originating in the rib cage.",
        "cure": "Wide surgical excision of chest wall and reconstruction."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK526038/"
  },
  "ribs": {
    "infections": [
      {
        "name": "Infectious Costochondritis",
        "desc": "Bacterial infection of the costochondral junction.",
        "cure": "Antibiotic therapy, surgical resection of infected cartilage if refractory."
      },
      {
        "name": "Rib Ewing Sarcoma",
        "desc": "Highly malignant pediatric bone tumor arising in the ribs.",
        "cure": "Systemic chemotherapy followed by surgical resection or radiotherapy."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK532954/"
  },
  "costal_cartilage": {
    "infections": [
      {
        "name": "Chondritis",
        "desc": "Inflammation or bacterial infection of the rib cartilage.",
        "cure": "NSAIDs for non-infectious; surgical excision and antibiotics for bacterial."
      },
      {
        "name": "Cartilaginous Chondrosarcoma",
        "desc": "Malignant tumor arising from costal cartilage joints.",
        "cure": "Radical surgical excision."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK526038/"
  },
  "sternum": {
    "infections": [
      {
        "name": "Sternal Osteomyelitis",
        "desc": "Infection of the breastbone, common after open-heart surgery.",
        "cure": "Sternal debridement, rewrite wiring, and negative pressure wound therapy."
      },
      {
        "name": "Sternal Chondrosarcoma",
        "desc": "Malignant tumor of the sternal bone tissue.",
        "cure": "Subtotal or total sternectomy and reconstructive mesh placement."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK531473/"
  },
  "xiphoid_process": {
    "infections": [
      {
        "name": "Xiphoiditis (Infectious)",
        "desc": "Rare infection or painful inflammation of the xiphoid process.",
        "cure": "Symptomatic treatment or surgical excision in chronic septic cases."
      },
      {
        "name": "Xiphoid Chondroma",
        "desc": "Benign cartilage-forming tumor of the xiphoid process.",
        "cure": "Observation or surgical excision if it becomes symptomatic."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK531473/"
  },
  "pelvis": {
    "infections": [
      {
        "name": "Pelvic Osteomyelitis",
        "desc": "Infection of pelvic bones, presenting as hip or groin pain.",
        "cure": "Intravenous antibiotics, abscess drainage, and joint rest."
      },
      {
        "name": "Pelvic Ewing Sarcoma",
        "desc": "Primary malignant bone tumor localized within pelvic girdle bones.",
        "cure": "Induction chemotherapy, pelvic resection, and radiation."
      }
    ],
    "url": "https://medlineplus.gov/pelvisbones.html"
  },
  "ilium": {
    "infections": [
      {
        "name": "Iliac Osteomyelitis",
        "desc": "Bacterial infection of the flat wing of the ilium.",
        "cure": "Targeted antibiotic therapy and surgical drainage if abscess is present."
      },
      {
        "name": "Ilium Chondrosarcoma",
        "desc": "Malignant bone cancer localizing in the iliac wing.",
        "cure": "Hemipelvectomy or limb-sparing surgical excision."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK519000/"
  },
  "ischium": {
    "infections": [
      {
        "name": "Ischial Bursitis (Infected)",
        "desc": "Septic inflammation of the bursa overlying the ischium.",
        "cure": "Needle aspiration, oral or IV antibiotics, and avoidance of sitting."
      },
      {
        "name": "Ischial Chondrosarcoma",
        "desc": "Malignant bone tumor arising from the ischial tuberosity.",
        "cure": "Wide local pelvic resection."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK519000/"
  },
  "pubis": {
    "infections": [
      {
        "name": "Osteitis Pubis (Septic)",
        "desc": "Infection of the pubic symphysis joint, causing groin pain.",
        "cure": "Long-term antibiotics and surgical curettage in severe chronic infections."
      },
      {
        "name": "Pubic Bone Osteoma",
        "desc": "Rare benign bone tumor of the pubic branch.",
        "cure": "Excision only if causing urinary tract or mechanical compression."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK519000/"
  },
  "limbs": {
    "infections": [
      {
        "name": "Septic Joint Arthritis",
        "desc": "Bacterial infection inside joint capsules of limbs.",
        "cure": "Joint irrigation, debridement, and empirical IV antibiotics."
      },
      {
        "name": "Osteosarcoma",
        "desc": "Highly malignant primary bone cancer in the extremities.",
        "cure": "Neoadjuvant chemotherapy and limb-salvage surgery."
      }
    ],
    "url": "https://medlineplus.gov/jointdisorders.html"
  },
  "humerus": {
    "infections": [
      {
        "name": "Humerus Osteomyelitis",
        "desc": "Infection of the upper arm bone, causing localized pain.",
        "cure": "Antibiotics and surgical immobilization."
      },
      {
        "name": "Ewing Sarcoma of Humerus",
        "desc": "Malignant round-cell tumor of the humerus shaft.",
        "cure": "Chemotherapy followed by surgical resection or radiation."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK534232/"
  },
  "radius_ulna": {
    "infections": [
      {
        "name": "Forearm Osteomyelitis",
        "desc": "Bacterial bone infection of the radius or ulna.",
        "cure": "Surgical debridement and targeted antibiotic therapy."
      },
      {
        "name": "Giant Cell Tumor of Radius",
        "desc": "Benign but locally destructive bone tumor of the distal radius.",
        "cure": "Surgical curettage and filling with bone cement."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK549887/"
  },
  "femur": {
    "infections": [
      {
        "name": "Femoral Osteomyelitis",
        "desc": "Infection of the femur, requiring aggressive treatment due to size.",
        "cure": "Surgical bone scraping, antibiotics, and temporary hardware stabilization if fractured."
      },
      {
        "name": "Osteosarcoma of the Femur",
        "desc": "Malignant primary bone tumor typically affecting the distal femur.",
        "cure": "Chemotherapy and wide margin limb-salvage resection."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK532982/"
  },
  "patella": {
    "infections": [
      {
        "name": "Prepatellar Bursitis (Septic)",
        "desc": "Infection of the bursa in front of the kneecap (Housemaid's knee).",
        "cure": "Aspiration, oral antibiotics, and knee compression."
      },
      {
        "name": "Patellar Giant Cell Tumor",
        "desc": "Extremely rare bone tumor in the patella.",
        "cure": "Curettage or patellectomy if bone structure is collapsed."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK519531/"
  },
  "tibia_fibula": {
    "infections": [
      {
        "name": "Shin Bone Osteomyelitis",
        "desc": "Infection of the tibia/fibula, common after compound fractures.",
        "cure": "Debridement, bone graft, and long-term antibiotic therapy."
      },
      {
        "name": "Tibia Osteosarcoma",
        "desc": "Primary bone malignancy in the proximal tibia.",
        "cure": "Chemotherapy and surgical reconstruction using endoprosthesis."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK526084/"
  },
  "heart": {
    "infections": [
      {
        "name": "Infective Endocarditis",
        "desc": "Bacterial infection of the inner heart lining and valves.",
        "cure": "High-dose IV antibiotics for 4-6 weeks, sometimes valve replacement surgery."
      },
      {
        "name": "Pericarditis",
        "desc": "Viral or bacterial infection of the sac surrounding the heart.",
        "cure": "Anti-inflammatories (NSAIDs, colchicine) or antibiotics."
      },
      {
        "name": "Cardiac Myxoma",
        "desc": "The most common primary, benign tumor of the heart.",
        "cure": "Surgical excision of the tumor and its site of attachment."
      }
    ],
    "url": "https://medlineplus.gov/heartdiseases.html"
  },
  "chambers": {
    "infections": [
      {
        "name": "Myocarditis",
        "desc": "Infection of the muscular heart chambers, often viral.",
        "cure": "Rest, heart failure medications (ACE inhibitors), and immune therapy."
      },
      {
        "name": "Cardiac Rhabdomyoma",
        "desc": "Benign tumor of striated muscle in heart chambers, common in infants.",
        "cure": "Observation (frequently regresses spontaneously) or surgical resection if obstructive."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK545184/"
  },
  "left_ventricle": {
    "infections": [
      {
        "name": "Left Ventricular Abscess",
        "desc": "Pus pocket in the left ventricle wall, complicating endocarditis.",
        "cure": "Urgent surgical repair and targeted antimicrobial therapy."
      },
      {
        "name": "Left Ventricular Fibroma",
        "desc": "Benign primary tumor arising in the thick myocardial wall of the left ventricle.",
        "cure": "Surgical removal to prevent ventricular arrhythmias."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK541016/"
  },
  "right_ventricle": {
    "infections": [
      {
        "name": "Right-Sided Endocarditis",
        "desc": "Infection of the right ventricle / tricuspid valve, common in IV drug use.",
        "cure": "Empirical antibiotic coverage and valve rehabilitation."
      },
      {
        "name": "Right Ventricular Angiosarcoma",
        "desc": "Highly malignant vascular cancer of the right ventricle.",
        "cure": "Combination of radical resection, chemotherapy, and immunotherapy."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK541016/"
  },
  "atria": {
    "infections": [
      {
        "name": "Atrial Endocarditis",
        "desc": "Bacterial colonization of the atrial endocardial walls.",
        "cure": "Prolonged course of intravenous bactericidal antibiotics."
      },
      {
        "name": "Atrial Myxoma",
        "desc": "Benign polypoid tumor usually arising from the left atrial septum.",
        "cure": "Urgent surgical resection to prevent mitral valve obstruction and systemic embolism."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK545184/"
  },
  "valves": {
    "infections": [
      {
        "name": "Valvular Vegetations",
        "desc": "Bacterial/fungal clumps on heart valves causing structural destruction.",
        "cure": "IV antibiotics or surgical valve reconstruction/replacement."
      },
      {
        "name": "Papillary Fibroelastoma",
        "desc": "Benign tumor on heart valves resembling a small sea anemone.",
        "cure": "Surgical removal to avoid cardiogenic stroke or embolism."
      }
    ],
    "url": "https://medlineplus.gov/heartvalvediseases.html"
  },
  "mitral_valve": {
    "infections": [
      {
        "name": "Mitral Valve Endocarditis",
        "desc": "Infection of the mitral valve leading to regurgitation.",
        "cure": "Antibiotics, mitral valve repair or replacement."
      },
      {
        "name": "Mitral Valve Fibroma",
        "desc": "Rare benign connective tissue tumor affecting mitral valve leaflets.",
        "cure": "Surgical resection preserving valve function."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK534241/"
  },
  "myocardium": {
    "infections": [
      {
        "name": "Viral Myocarditis",
        "desc": "Inflammation of myocardium caused by Coxsackievirus or COVID-19.",
        "cure": "Symptomatic support, beta-blockers, and rest."
      },
      {
        "name": "Myocardial Angiosarcoma",
        "desc": "Highly invasive malignant vascular tumor in myocardium tissue.",
        "cure": "Chemotherapy, palliative surgery, or heart transplant (rarely successful)."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK534778/"
  },
  "coronary_arteries": {
    "infections": [
      {
        "name": "Coronary Arteritis",
        "desc": "Infection or autoimmune swelling of coronary vessels (e.g. Kawasaki disease).",
        "cure": "Intravenous immunoglobulin (IVIG) and aspirin."
      },
      {
        "name": "Coronary Leiomyosarcoma",
        "desc": "Extremely rare malignant smooth muscle tumor of coronary walls.",
        "cure": "Surgical resection and bypass grafting."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK534778/"
  },
  "arteries": {
    "infections": [
      {
        "name": "Infectious Arteritis",
        "desc": "Infection of arterial walls by bacteria, risking rupture.",
        "cure": "Antibiotics and surgical vascular bypass."
      },
      {
        "name": "Arterial Hemangioma",
        "desc": "Benign tumor of blood vessel cells within arterial pathways.",
        "cure": "Sclerotherapy, laser therapy, or surgical excision."
      }
    ],
    "url": "https://medlineplus.gov/vasculitis.html"
  },
  "aorta": {
    "infections": [
      {
        "name": "Aortitis",
        "desc": "Inflammation/infection of the aorta, sometimes caused by Syphilis or Tuberculosis.",
        "cure": "Penicillin/antitubercular drugs and steroid therapy."
      },
      {
        "name": "Aortic Angiosarcoma",
        "desc": "Malignant tumor originating from endothelial cells of the aorta.",
        "cure": "Aggressive chemotherapy and synthetic vascular graft bypass."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK538466/"
  },
  "aortic_arch": {
    "infections": [
      {
        "name": "Mycotic Aneurysm of Aortic Arch",
        "desc": "Infectious destruction of the aortic arch wall.",
        "cure": "Urgent surgical graft replacement and long-term antibiotic therapy."
      },
      {
        "name": "Aortic Arch Intimal Sarcoma",
        "desc": "Rare tumor obstructing flow through the arch.",
        "cure": "Surgical endarterectomy and bypass reconstruction."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK538466/"
  },
  "carotid_arteries": {
    "infections": [
      {
        "name": "Carotid Sheath Infection",
        "desc": "Deep neck infection spreading around the carotid artery.",
        "cure": "Surgical drainage and intravenous antibiotics."
      },
      {
        "name": "Carotid Body Tumor",
        "desc": "A paraganglioma tumor located at the carotid artery bifurcation.",
        "cure": "Surgical resection or radiotherapy."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK538443/"
  },
  "femoral_arteries": {
    "infections": [
      {
        "name": "Femoral Artery Graft Infection",
        "desc": "Bacterial infection of synthetic arterial grafts in the groin.",
        "cure": "Graft removal, extra-anatomical bypass, and IV antibiotics."
      },
      {
        "name": "Femoral Angiosarcoma",
        "desc": "Malignant vascular wall tumor of the femoral artery.",
        "cure": "Wide margin resection and chemotherapy."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK538443/"
  },
  "veins": {
    "infections": [
      {
        "name": "Septic Thrombophlebitis",
        "desc": "Infection of a vein associated with a blood clot.",
        "cure": "Anticoagulants and antibiotic therapy."
      },
      {
        "name": "Venous Hemangioma",
        "desc": "Benign vascular tumor inside large veins.",
        "cure": "Surgical excision or compression therapy."
      }
    ],
    "url": "https://medlineplus.gov/bloodvessels.html"
  },
  "vena_cava": {
    "infections": [
      {
        "name": "Vena Cava Catheter-Associated Infection",
        "desc": "Infection of central venous lines placed in the vena cava.",
        "cure": "Removal of the catheter and systemic IV antibiotics."
      },
      {
        "name": "Vena Cava Leiomyosarcoma",
        "desc": "Primary malignant smooth muscle tumor of the vena cava wall.",
        "cure": "Radical resection, vascular reconstruction, and radiation."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK544322/"
  },
  "jugular_veins": {
    "infections": [
      {
        "name": "Lemierre's Syndrome",
        "desc": "Jugular vein septic thrombophlebitis following a sore throat.",
        "cure": "Intravenous antibiotics (e.g. metronidazole) and blood thinners."
      },
      {
        "name": "Glomus Jugulare Tumor",
        "desc": "Benign neuroendocrine tumor located in the jugular foramen.",
        "cure": "Surgical excision or stereotactic radiosurgery."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK544322/"
  },
  "brain": {
    "infections": [
      {
        "name": "Viral Encephalitis",
        "desc": "Acute infection of brain tissue, commonly from Herpes Simplex Virus.",
        "cure": "Intravenous acyclovir and supportive care."
      },
      {
        "name": "Brain Abscess",
        "desc": "Localized pus accumulation in the brain, bacterial or fungal.",
        "cure": "Surgical drainage (craniotomy) and targeted antibiotics."
      },
      {
        "name": "Glioblastoma Multiforme (GBM)",
        "desc": "Highly malignant primary glial cell brain tumor.",
        "cure": "Maximal surgical resection, temozolomide chemotherapy, and radiotherapy."
      }
    ],
    "url": "https://medlineplus.gov/braindiseases.html"
  },
  "cerebrum": {
    "infections": [
      {
        "name": "Cerebral Malaria",
        "desc": "Severe neurological complication of Plasmodium falciparum infection.",
        "cure": "Intravenous artesunate and intensive care support."
      },
      {
        "name": "Cerebral Astrocytoma",
        "desc": "Primary tumor of astrocytes in the cerebral cortex.",
        "cure": "Surgical resection and tumor-treating fields therapy."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK532296/"
  },
  "frontal_lobe": {
    "infections": [
      {
        "name": "Frontal Lobe Abscess",
        "desc": "Pus collection in frontal lobe, often from sinus infections.",
        "cure": "Surgical evacuation and IV cephalosporins."
      },
      {
        "name": "Frontal Oligodendroglioma",
        "desc": "Primary glial tumor in the frontal lobe of the cerebrum.",
        "cure": "Surgical resection, radiation, and chemotherapy (PCV regimen)."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK532296/"
  },
  "occipital_lobe": {
    "infections": [
      {
        "name": "Occipital Lobe Neurocysticercosis",
        "desc": "Parasitic infection of the brain caused by tapeworm larval cysts.",
        "cure": "Antiparasitics (albendazole) and anti-seizure meds."
      },
      {
        "name": "Occipital Glioma",
        "desc": "Malignant tumor in the occipital lobe affecting visual fields.",
        "cure": "Surgical resection, radiation, and chemotherapy."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK544320/"
  },
  "cerebellum": {
    "infections": [
      {
        "name": "Cerebellitis (Acute)",
        "desc": "Post-viral inflammatory or direct infectious attack on the cerebellum.",
        "cure": "Steroids to reduce swelling, antiviral or antibiotic therapy."
      },
      {
        "name": "Medulloblastoma",
        "desc": "Malignant neuroepithelial tumor arising in the cerebellum.",
        "cure": "Surgical resection, craniospinal radiation, and chemotherapy."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK538183/"
  },
  "brainstem": {
    "infections": [
      {
        "name": "Listeria Rhombencephalitis",
        "desc": "Severe brainstem infection caused by Listeria monocytogenes.",
        "cure": "High-dose IV ampicillin and gentamicin."
      },
      {
        "name": "Brainstem Glioma (DIPG)",
        "desc": "Aggressive, infiltrative glial tumor in the brainstem.",
        "cure": "Palliative radiation therapy (surgery is generally impossible due to location)."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK544322/"
  },
  "medulla_oblongata": {
    "infections": [
      {
        "name": "Bulbar Poliomyelitis",
        "desc": "Polio infection attacking the medulla, impacting respiratory control.",
        "cure": "Supportive ventilator care, prevention via polio vaccination."
      },
      {
        "name": "Medullary Astrocytoma",
        "desc": "Primary brainstem tumor in the medulla oblongata.",
        "cure": "Palliative radiation and surgical debulking if focal."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK470343/"
  },
  "spinal_cord": {
    "infections": [
      {
        "name": "Myelitis",
        "desc": "Inflammation/infection of the spinal cord (e.g. Transverse Myelitis).",
        "cure": "Corticosteroids, plasma exchange, and physical therapy."
      },
      {
        "name": "Poliomyelitis",
        "desc": "Viral destruction of motor neurons in the spinal cord.",
        "cure": "Supportive care, respiratory support, and vaccine prevention."
      },
      {
        "name": "Spinal Ependymoma",
        "desc": "Primary glial tumor of the spinal cord central canal.",
        "cure": "Complete microsurgical resection."
      }
    ],
    "url": "https://medlineplus.gov/spinalcorddiseases.html"
  },
  "grey_matter": {
    "infections": [
      {
        "name": "Poliovirus Infection",
        "desc": "Viral replication in the anterior horn grey matter of the spinal cord.",
        "cure": "Strict bed rest, supportive care, and physical rehabilitation."
      },
      {
        "name": "Amyotrophic Lateral Sclerosis (ALS)",
        "desc": "Malignant neurodegenerative disease of motor neurons in grey matter.",
        "cure": "Riluzole, edaravone, and symptomatic supportive therapy (no cure)."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK553147/"
  },
  "white_matter": {
    "infections": [
      {
        "name": "Progressive Multifocal Leukoencephalopathy (PML)",
        "desc": "Viral demyelinating disease of white matter (JC Virus).",
        "cure": "Reversal of immunosuppression, antiretroviral therapy for HIV."
      },
      {
        "name": "Multiple Sclerosis (Demyelination)",
        "desc": "Autoimmune disease attacking myelin sheets in white matter.",
        "cure": "Disease-modifying therapies (Ocrelizumab, interferon) and steroids."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK553147/"
  },
  "peripheral_nerves": {
    "infections": [
      {
        "name": "Shingles (Herpes Zoster)",
        "desc": "Reactivation of chickenpox virus along peripheral sensory nerves.",
        "cure": "Antiviral drugs (valacyclovir) and pain management."
      },
      {
        "name": "Schwannoma",
        "desc": "Benign nerve sheath tumor of peripheral nerves.",
        "cure": "Surgical removal of the tumor preserving the nerve fibers."
      }
    ],
    "url": "https://medlineplus.gov/peripheralnervedisorders.html"
  },
  "sciatic_nerve": {
    "infections": [
      {
        "name": "Sciatic Neuritis",
        "desc": "Inflammation or rare local infection of the sciatic nerve.",
        "cure": "Anti-inflammatories, physical therapy, and warm compresses."
      },
      {
        "name": "Sciatic Schwannoma",
        "desc": "Benign nerve sheath tumor localized on the sciatic nerve.",
        "cure": "Microscopic surgical resection."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK482431/"
  },
  "vagus_nerve": {
    "infections": [
      {
        "name": "Vagal Neuropathy (Infectious)",
        "desc": "Vagus nerve damage from viral infections (Varicella or HSV).",
        "cure": "Antivirals and speech/swallowing therapy if voice is affected."
      },
      {
        "name": "Vagus Nerve Schwannoma",
        "desc": "Slow-growing nerve sheath tumor of the vagus nerve in the neck.",
        "cure": "Surgical excision with vagus nerve preservation."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK537171/"
  },
  "lungs": {
    "infections": [
      {
        "name": "Bacterial Pneumonia",
        "desc": "Infection of lung air sacs, filled with pus/fluid.",
        "cure": "Antibiotics (e.g. amoxicillin, azithromycin) and oxygen therapy."
      },
      {
        "name": "Pulmonary Tuberculosis",
        "desc": "Chronic bacterial lung infection (Mycobacterium tuberculosis).",
        "cure": "Combination antibiotics (Rifampin, Isoniazid, Pyrazinamide) for 6+ months."
      },
      {
        "name": "Non-Small Cell Lung Carcinoma",
        "desc": "The most common type of primary malignant lung tumor.",
        "cure": "Surgery, chemotherapy, immunotherapy, and radiation."
      }
    ],
    "url": "https://medlineplus.gov/lungdiseases.html"
  },
  "left_lung": {
    "infections": [
      {
        "name": "Left Lobar Pneumonia",
        "desc": "Infection localized to the left lung lobes.",
        "cure": "Antibiotics and chest physical therapy."
      },
      {
        "name": "Left Lung Adenocarcinoma",
        "desc": "Malignant tumor in the left lung tissue.",
        "cure": "Lobectomy, chemotherapy, or targeted molecular therapy."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK541061/"
  },
  "right_lung": {
    "infections": [
      {
        "name": "Right-Sided Aspiration Pneumonia",
        "desc": "Infection due to inhaled stomach contents, common in the right lung due to straight bronchus anatomy.",
        "cure": "Broad-spectrum antibiotics and airway suctioning."
      },
      {
        "name": "Right Lung Squamous Cell Carcinoma",
        "desc": "Malignant tumor arising from the bronchial epithelium in the right lung.",
        "cure": "Pneumonectomy or chemoradiotherapy."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK541061/"
  },
  "alveoli": {
    "infections": [
      {
        "name": "Pneumocystis Pneumonia (PCP)",
        "desc": "Fungal infection of the alveoli, common in immunocompromised states.",
        "cure": "Trimethoprim-sulfamethoxazole (TMP-SMX)."
      },
      {
        "name": "Alveolar Cell Carcinoma",
        "desc": "Malignant tumor arising from type II pneumocytes in the alveoli.",
        "cure": "Surgical resection and targeted EGFR inhibitors."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK541061/"
  },
  "stomach": {
    "infections": [
      {
        "name": "Helicobacter pylori Infection",
        "desc": "Bacterial colonization of stomach lining, causing ulcers.",
        "cure": "Triple therapy: proton pump inhibitors (PPI) + two antibiotics."
      },
      {
        "name": "Gastric Adenocarcinoma",
        "desc": "Malignant tumor arising from the glandular cells of the stomach.",
        "cure": "Subtotal or total gastrectomy, chemotherapy, and immunotherapy."
      }
    ],
    "url": "https://medlineplus.gov/stomachdisorders.html"
  },
  "fundus": {
    "infections": [
      {
        "name": "Fundic Gastritis",
        "desc": "Infection-driven inflammation of the upper stomach fundus.",
        "cure": "H. pylori eradication and acid-reducing medication."
      },
      {
        "name": "Gastrointestinal Stromal Tumor (GIST)",
        "desc": "Malignant pacemaker cell tumor arising in the gastric fundus wall.",
        "cure": "Surgical resection and tyrosine kinase inhibitors (Imatinib)."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK544314/"
  },
  "pylorus": {
    "infections": [
      {
        "name": "Pyloric Gastric Mucosa Infection",
        "desc": "Inflammation at the pyloric sphincter, restricting passage.",
        "cure": "Antibiotics and mucosal protective agents."
      },
      {
        "name": "Pyloric Stenosis Adenocarcinoma",
        "desc": "Malignant tumor obstructing the pyloric outlet.",
        "cure": "Distal gastrectomy and gastrojejunostomy bypass."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK544314/"
  },
  "gastric_mucosa": {
    "infections": [
      {
        "name": "Phlegmonous Gastritis",
        "desc": "Rare, life-threatening bacterial infection of gastric mucosa.",
        "cure": "Intravenous antibiotics and emergency partial gastrectomy."
      },
      {
        "name": "Gastric MALT Lymphoma",
        "desc": "Bacterial-driven tumor of mucosa-associated lymphoid tissue.",
        "cure": "H. pylori antibiotic eradication therapy (leads to complete remission in 80%)."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK544314/"
  },
  "liver": {
    "infections": [
      {
        "name": "Hepatitis B & C",
        "desc": "Viral infections of the liver leading to chronic damage.",
        "cure": "Antiviral drugs (tenofovir, sofosbuvir) and liver monitoring."
      },
      {
        "name": "Pyogenic Liver Abscess",
        "desc": "Pus pocket in liver, usually bacterial from biliary infection.",
        "cure": "Catheter drainage and IV antibiotics."
      },
      {
        "name": "Hepatocellular Carcinoma (HCC)",
        "desc": "Primary malignant tumor of liver cells.",
        "cure": "Surgical resection, liver transplant, or radiofrequency ablation."
      }
    ],
    "url": "https://medlineplus.gov/liverdiseases.html"
  },
  "hepatic_lobes": {
    "infections": [
      {
        "name": "Amebic Liver Abscess",
        "desc": "Infection of hepatic lobes by Entamoeba histolytica parasite.",
        "cure": "Metronidazole followed by a luminal amebicide."
      },
      {
        "name": "Cholangiocarcinoma of Hepatic Lobes",
        "desc": "Malignant tumor of the bile ducts inside the liver lobes.",
        "cure": "Surgical lobectomy, biliary stent placement, and chemotherapy."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK535437/"
  },
  "gallbladder": {
    "infections": [
      {
        "name": "Acute Cholecystitis",
        "desc": "Infection/inflammation of the gallbladder, often from gallstones.",
        "cure": "Gallbladder removal surgery (cholecystectomy) and antibiotics."
      },
      {
        "name": "Gallbladder Adenocarcinoma",
        "desc": "Aggressive malignant tumor arising in the gallbladder wall.",
        "cure": "Cholycystectomy and liver bed resection."
      }
    ],
    "url": "https://medlineplus.gov/gallbladderdiseases.html"
  },
  "hepatocytes": {
    "infections": [
      {
        "name": "Viral Hepatocyte Lysis",
        "desc": "Destruction of liver cells by hepatotropic viruses.",
        "cure": "Antivirals and supportive liver care."
      },
      {
        "name": "Adenoma of Hepatocytes",
        "desc": "Benign tumor of hepatocytes, linked to oral contraceptive use.",
        "cure": "Observation or surgical excision to avoid spontaneous rupture."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK535437/"
  },
  "intestines": {
    "infections": [
      {
        "name": "Salmonellosis",
        "desc": "Bacterial infection of intestines from contaminated food.",
        "cure": "Rehydration, antibiotics for severe or systemic cases."
      },
      {
        "name": "Giardiasis",
        "desc": "Microscopic parasitic infection causing diarrheal illness.",
        "cure": "Metronidazole or tinidazole."
      },
      {
        "name": "Colorectal Adenocarcinoma",
        "desc": "Malignant tumor of the large intestine or rectum.",
        "cure": "Surgical resection, chemotherapy, and radiation."
      }
    ],
    "url": "https://medlineplus.gov/intestinaldiseases.html"
  },
  "small_intestine": {
    "infections": [
      {
        "name": "Duodenitis / Jejunitis",
        "desc": "Bacterial or viral infection of small intestine segments.",
        "cure": "Antibiotics or hydration depending on cause."
      },
      {
        "name": "Small Bowel Neuroendocrine Tumor",
        "desc": "Slow-growing carcinoid tumor of the small intestine.",
        "cure": "Surgical resection and octreotide injections."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK532937/"
  },
  "villi": {
    "infections": [
      {
        "name": "Rotavirus Villous Atrophy",
        "desc": "Viral infection destroying intestinal villi, causing malabsorption.",
        "cure": "Fluid replacement, zinc supplements, and vaccination prevention."
      },
      {
        "name": "Intestinal Lymphoma",
        "desc": "Malignant immune cell tumor localizing in the small intestine villi.",
        "cure": "Chemotherapy (CHOP regimen) and surgical resection if perforated."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK532937/"
  },
  "large_intestine": {
    "infections": [
      {
        "name": "Clostridioides difficile Colitis",
        "desc": "Bacterial infection causing severe colon inflammation, often post-antibiotic use.",
        "cure": "Oral vancomycin or fidaxomicin, fecal microbiota transplant."
      },
      {
        "name": "Colorectal Adenocarcinoma",
        "desc": "Common epithelial malignancy of the large bowel.",
        "cure": "Colectomy, adjuvant chemotherapy (FOLFOX), and immunotherapy."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK507857/"
  },
  "kidneys": {
    "infections": [
      {
        "name": "Acute Pyelonephritis",
        "desc": "Bacterial infection of the kidney, spreading from bladder.",
        "cure": "Oral or intravenous antibiotics (ciprofloxacin or ceftriaxone)."
      },
      {
        "name": "Renal Abscess",
        "desc": "Collection of pus inside the kidney tissue.",
        "cure": "Surgical drainage and targeted IV antibiotics."
      },
      {
        "name": "Renal Cell Carcinoma (RCC)",
        "desc": "The most common primary malignant kidney tumor.",
        "cure": "Partial or radical nephrectomy, immunotherapy, and tyrosine kinase inhibitors."
      }
    ],
    "url": "https://medlineplus.gov/kidneydiseases.html"
  },
  "renal_cortex": {
    "infections": [
      {
        "name": "Glomerulonephritis (Post-Streptococcal)",
        "desc": "Immune-mediated kidney damage following Strep throat infection.",
        "cure": "Antibiotics, diuretics, and blood pressure control."
      },
      {
        "name": "Renal Oncocytoma",
        "desc": "Benign epithelial tumor of the renal cortex.",
        "cure": "Partial nephrectomy or active surveillance."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK539824/"
  },
  "nephrons": {
    "infections": [
      {
        "name": "Interstitial Nephritis",
        "desc": "Inflammation of the nephron spaces, often drug-induced or infectious.",
        "cure": "Discontinuing offending drug, corticosteroids, or treating infection."
      },
      {
        "name": "Wilms Tumor (Nephroblastoma)",
        "desc": "Highly malignant pediatric kidney tumor originating from nephron precursor cells.",
        "cure": "Nephrectomy, chemotherapy, and radiotherapy."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK539824/"
  },
  "male_reproductive": {
    "infections": [
      {
        "name": "Chlamydia & Gonorrhea",
        "desc": "Bacterial sexually transmitted infections of reproductive tract.",
        "cure": "Antibiotics (ceftriaxone and doxycycline)."
      },
      {
        "name": "Prostate Adenocarcinoma",
        "desc": "Malignant tumor of the prostate gland.",
        "cure": "Prostatectomy, hormone therapy (androgen deprivation), or radiation."
      }
    ],
    "url": "https://medlineplus.gov/malereproductivesystem.html"
  },
  "testes": {
    "infections": [
      {
        "name": "Epididymo-orchitis",
        "desc": "Infection/inflammation of the testes, often bacterial or viral (Mumps).",
        "cure": "Antibiotics, bed rest, scrotal elevation, and ice packs."
      },
      {
        "name": "Testicular Seminoma",
        "desc": "Malignant germ cell tumor of the testes.",
        "cure": "Radical inguinal orchiectomy and chemotherapy (cisplatin)."
      }
    ],
    "url": "https://medlineplus.gov/testiculardisorders.html"
  },
  "prostate": {
    "infections": [
      {
        "name": "Acute Bacterial Prostatitis",
        "desc": "Bacterial infection of the prostate, causing painful urination.",
        "cure": "Antibiotics (fluoroquinolones) for 4-6 weeks."
      },
      {
        "name": "Benign Prostatic Hyperplasia (BPH)",
        "desc": "Non-malignant glandular tumorous growth of the prostate.",
        "cure": "Alpha-blockers, 5-alpha-reductase inhibitors, or TURP surgery."
      }
    ],
    "url": "https://medlineplus.gov/prostatediseases.html"
  },
  "female_reproductive": {
    "infections": [
      {
        "name": "Pelvic Inflammatory Disease (PID)",
        "desc": "Infection of female reproductive organs, causing pelvic pain.",
        "cure": "Broad-spectrum oral or IV antibiotics."
      },
      {
        "name": "Cervical Intraepithelial Neoplasia (CIN)",
        "desc": "Pre-cancerous tumor of the cervix caused by Human Papillomavirus (HPV).",
        "cure": "LEEP procedure, cryotherapy, or cold knife cone biopsy."
      }
    ],
    "url": "https://medlineplus.gov/femalereproductivesystem.html"
  },
  "uterus": {
    "infections": [
      {
        "name": "Endometritis",
        "desc": "Infection of the uterine lining, common after childbirth.",
        "cure": "Intravenous clindamycin and gentamicin."
      },
      {
        "name": "Uterine Leiomyoma (Fibroid)",
        "desc": "Benign smooth muscle tumor of the uterus wall.",
        "cure": "Observation, myomectomy, or hysterectomy."
      },
      {
        "name": "Endometrial Carcinoma",
        "desc": "Malignant tumor arising from the uterine lining.",
        "cure": "Hysterectomy, bilateral salpingo-oophorectomy, and chemotherapy."
      }
    ],
    "url": "https://medlineplus.gov/uterinediseases.html"
  },
  "ovaries": {
    "infections": [
      {
        "name": "Oophoritis",
        "desc": "Inflammation/infection of the ovaries, often co-occurring with PID.",
        "cure": "Combination antibiotics and surgical drainage if abscess forms."
      },
      {
        "name": "Epithelial Ovarian Cancer",
        "desc": "Malignant tumor of the outer surface of ovaries.",
        "cure": "Surgical cytoreduction, chemotherapy (carboplatin/paclitaxel)."
      }
    ],
    "url": "https://medlineplus.gov/ovariandisorders.html"
  },
  "skin": {
    "infections": [
      {
        "name": "Cellulitis",
        "desc": "Common bacterial skin infection causing redness, swelling, and heat.",
        "cure": "Oral or intravenous antibiotics (e.g. cephalexin)."
      },
      {
        "name": "Necrotizing Fasciitis",
        "desc": "Rare 'flesh-eating' bacterial infection destroying deep skin layers.",
        "cure": "Emergency surgical debridement and IV antibiotics."
      },
      {
        "name": "Basal Cell Carcinoma (BCC)",
        "desc": "The most common type of primary skin cancer/tumor.",
        "cure": "Surgical excision or Mohs micrographic surgery."
      }
    ],
    "url": "https://medlineplus.gov/skin-infections.html"
  },
  "epidermis": {
    "infections": [
      {
        "name": "Impetigo",
        "desc": "Highly contagious superficial bacterial infection causing sores.",
        "cure": "Topical mupirocin ointment or oral cephalexin."
      },
      {
        "name": "Tinea Corporis (Ringworm)",
        "desc": "Superficial fungal infection of the outer skin layer.",
        "cure": "Topical or oral antifungals (e.g. clotrimazole)."
      },
      {
        "name": "Malignant Melanoma",
        "desc": "Highly aggressive malignant tumor of epidermal melanocytes.",
        "cure": "Wide local excision, sentinel lymph node biopsy, and immunotherapy."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK470464/"
  },
  "dermis": {
    "infections": [
      {
        "name": "Folliculitis",
        "desc": "Infection of hair follicles in the dermis, usually bacterial.",
        "cure": "Warm compresses, topical antibiotics, or antibacterial washes."
      },
      {
        "name": "Erysipelas",
        "desc": "Bacterial infection of the upper dermis, causing raised bright red rash.",
        "cure": "Penicillin or other antibiotics."
      },
      {
        "name": "Squamous Cell Carcinoma (SCC)",
        "desc": "Malignant tumor arising from epidermal keratinocytes invading the dermis.",
        "cure": "Surgical excision or cryotherapy."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK470464/"
  },
  "subcutaneous": {
    "infections": [
      {
        "name": "Subcutaneous Abscess",
        "desc": "Collection of pus under the skin, often bacterial.",
        "cure": "Incision and drainage (I&D) and antibiotics."
      },
      {
        "name": "Subcutaneous Lipoma",
        "desc": "Benign slow-growing tumor of fat cells in the subcutaneous layer.",
        "cure": "Observation or surgical excision if cosmetically troubling."
      }
    ],
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK470464/"
  },
  "blood": {
    "infections": [
      {
        "name": "Septicemia (Sepsis)",
        "desc": "Life-threatening immune response to systemic bloodstream infection.",
        "cure": "Emergency IV antibiotics, fluids, and organ support."
      },
      {
        "name": "Bacteremia",
        "desc": "Presence of bacteria in the blood, risking spread.",
        "cure": "Intravenous antibiotic therapy."
      },
      {
        "name": "Acute Myeloid Leukemia (AML)",
        "desc": "Malignant cancer of myeloid blood cells starting in bone marrow.",
        "cure": "Induction chemotherapy (cytarabine/daunorubicin) and stem cell transplant."
      }
    ],
    "url": "https://medlineplus.gov/bloodinfection.html"
  },
  "red_blood_cells": {
    "infections": [
      {
        "name": "Malaria",
        "desc": "Parasitic infection (Plasmodium) destroying red blood cells.",
        "cure": "Artemisinin-based combination therapies (ACTs)."
      },
      {
        "name": "Babesiosis",
        "desc": "Tick-borne malaria-like parasite infecting red blood cells.",
        "cure": "Clindamycin and quinine."
      },
      {
        "name": "Polycythemia Vera",
        "desc": "Slow-growing blood cancer causing overproduction of red blood cells.",
        "cure": "Phlebotomy (blood draw) and low-dose aspirin or hydroxyurea."
      }
    ],
    "url": "https://medlineplus.gov/redbloodcells.html"
  },
  "white_blood_cells": {
    "infections": [
      {
        "name": "HIV (attacks CD4+ T-cells)",
        "desc": "Viral infection destroying helper T-cells, leading to AIDS.",
        "cure": "Antiretroviral therapy (ART) to suppress viral replication (no absolute cure)."
      },
      {
        "name": "Infectious Mononucleosis",
        "desc": "Epstein-Barr virus infection targeting B-lymphocytes.",
        "cure": "Rest, hydration, and symptomatic pain relief."
      },
      {
        "name": "Hodgkin Lymphoma",
        "desc": "Malignant tumor of the lymphatic system, characterized by Reed-Sternberg cells.",
        "cure": "Chemotherapy (ABVD regimen) and radiation therapy."
      }
    ],
    "url": "https://medlineplus.gov/whitebloodcells.html"
  },
  "platelets": {
    "infections": [
      {
        "name": "Dengue-Induced Thrombocytopenia",
        "desc": "Viral dengue fever causing massive platelet drop and bleeding risk.",
        "cure": "Fluid management, rest, and platelet transfusion if hemorrhaging."
      },
      {
        "name": "Essential Thrombocythemia",
        "desc": "Myeloproliferative tumor causing overproduction of platelets.",
        "cure": "Hydroxyurea, anagrelide, and low-dose aspirin to prevent clots."
      }
    ],
    "url": "https://medlineplus.gov/platelets.html"
  }
};

// Procedurally flatten database and inject system/hierarchy data
(function initializeDatabase() {
  function traverse(node, systemId, path = [], parentId = null) {
    for (const key in node) {
      if (key === 'name' || key === 'description' || key === 'children' || key === 'icon' || key === 'color' || key === 'sexSpecific') continue;
      
      const item = node[key];
      const currentPath = [...path, { id: key, name: item.name }];
      
      // Calculate approximate 3D viewing coordinates relative to human model height (4 units total, centered at 0)
      let coords = { x: 0, y: 0, z: 0, zoom: 1.5 };
      
      // Fine-grained target focus coordinates for camera tracking
      switch (key) {
        // Head / Skull / Brain
        case 'skull':
        case 'cranium':
        case 'occipital_bone':
        case 'frontal_bone':
        case 'mandible':
        case 'brain':
        case 'cerebrum':
        case 'frontal_lobe':
        case 'occipital_lobe':
        case 'cerebellum':
        case 'brainstem':
        case 'medulla_oblongata':
          coords = { x: 0, y: 1.6, z: 0.1, zoom: 0.6 };
          break;
          
        // Spine / Nervous Neck
        case 'cervical':
        case 'atlas_vertebra':
        case 'axis_vertebra':
          coords = { x: 0, y: 1.1, z: -0.1, zoom: 0.5 };
          break;
        case 'spine':
        case 'spinal_cord':
        case 'grey_matter':
        case 'white_matter':
          coords = { x: 0, y: 0.3, z: -0.1, zoom: 1.6 };
          break;
          
        // Heart
        case 'heart':
        case 'chambers':
        case 'left_ventricle':
        case 'right_ventricle':
        case 'atria':
        case 'valves':
        case 'mitral_valve':
        case 'myocardium':
        case 'coronary_arteries':
          coords = { x: -0.05, y: 0.55, z: 0.2, zoom: 0.4 };
          break;
          
        // Lungs / Ribcage
        case 'lungs':
        case 'left_lung':
          coords = { x: -0.2, y: 0.5, z: 0.15, zoom: 0.6 };
          break;
        case 'right_lung':
          coords = { x: 0.2, y: 0.5, z: 0.15, zoom: 0.6 };
          break;
        case 'alveoli':
          coords = { x: 0.2, y: 0.4, z: 0.15, zoom: 0.2 };
          break;
        case 'ribcage':
        case 'ribs':
        case 'costal_cartilage':
        case 'sternum':
        case 'xiphoid_process':
          coords = { x: 0, y: 0.5, z: 0.2, zoom: 0.9 };
          break;
          
        // Visceral Organs (Upper abdomen)
        case 'stomach':
        case 'fundus':
        case 'pylorus':
        case 'gastric_mucosa':
          coords = { x: -0.12, y: 0.15, z: 0.15, zoom: 0.45 };
          break;
        case 'liver':
        case 'hepatic_lobes':
        case 'gallbladder':
        case 'hepatocytes':
          coords = { x: 0.15, y: 0.18, z: 0.15, zoom: 0.5 };
          break;
        case 'kidneys':
        case 'renal_cortex':
        case 'nephrons':
          coords = { x: 0, y: 0.05, z: -0.2, zoom: 0.5 }; // Posterior view
          break;
          
        // Lower Abdomen / Pelvis
        case 'intestines':
        case 'small_intestine':
        case 'villi':
        case 'large_intestine':
          coords = { x: 0, y: -0.25, z: 0.15, zoom: 0.7 };
          break;
        case 'pelvis':
        case 'ilium':
        case 'ischium':
        case 'pubis':
          coords = { x: 0, y: -0.7, z: 0.1, zoom: 0.9 };
          break;
          
        // Reproductive
        case 'male_reproductive':
        case 'testes':
        case 'prostate':
          coords = { x: 0, y: -0.9, z: 0.1, zoom: 0.4 };
          break;
        case 'female_reproductive':
        case 'uterus':
        case 'ovaries':
          coords = { x: 0, y: -0.85, z: 0.1, zoom: 0.4 };
          break;
          
        // Cardiovascular major pipes
        case 'arteries':
        case 'aorta':
        case 'aortic_arch':
        case 'carotid_arteries':
        case 'veins':
        case 'vena_cava':
        case 'jugular_veins':
          coords = { x: 0, y: 0.4, z: 0.05, zoom: 1.2 };
          break;
        case 'femoral_arteries':
          coords = { x: -0.15, y: -1.1, z: 0.05, zoom: 0.8 };
          break;
          
        // Limbs / Extremities
        case 'humerus':
        case 'radius_ulna':
          coords = { x: -0.6, y: 0.3, z: 0, zoom: 1.1 };
          break;
        case 'femur':
        case 'patella':
          coords = { x: -0.2, y: -1.4, z: 0, zoom: 1.1 };
          break;
        case 'tibia_fibula':
          coords = { x: -0.2, y: -2.1, z: 0, zoom: 1.1 };
          break;
        case 'sciatic_nerve':
          coords = { x: -0.15, y: -1.3, z: -0.1, zoom: 1.2 };
          break;
        case 'skin':
        case 'epidermis':
        case 'dermis':
        case 'subcutaneous':
          coords = { x: 0, y: 0.3, z: 0.15, zoom: 1.5 };
          break;
        case 'blood':
        case 'red_blood_cells':
        case 'white_blood_cells':
        case 'platelets':
          coords = { x: 0, y: 0.4, z: 0.15, zoom: 1.2 };
          break;
      }

      const detail = ANATOMY_DETAILS[key] || {};
      ANATOMY_DATABASE.flatDatabase[key] = {
        id: key,
        name: item.name,
        description: item.description,
        system: systemId,
        parentId: parentId,
        path: currentPath,
        sexSpecific: item.sexSpecific || null,
        coords: coords,
        children: item.children ? Object.keys(item.children) : [],
        infections: detail.infections || [],
        externalUrl: detail.url || "https://medlineplus.gov/"
      };

      if (item.children) {
        traverse(item.children, systemId, currentPath, key);
      }
    }
  }

  // Run traversals across top level systems
  for (const systemKey in ANATOMY_DATABASE.hierarchy) {
    const system = ANATOMY_DATABASE.hierarchy[systemKey];
    traverse(system.children, systemKey, [{ id: systemKey, name: system.name, isSystem: true }], systemKey);
  }
})();

// Export for ES modules and browser environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ANATOMY_DATABASE;
} else {
  window.ANATOMY_DATABASE = ANATOMY_DATABASE;
}
